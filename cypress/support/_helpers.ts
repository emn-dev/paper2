// /*
//  * Paper.js - The Swiss Army Knife of Vector Graphics Scripting.
//  * http://paperjs.org/
//  *
//  * Copyright (c) 2011 - 2020, Jürg Lehni & Jonathan Puckey
//  * http://juerglehni.com/ & https://puckey.studio/
//  *
//  * Distributed under the MIT license. See LICENSE file for details.
//  *
//  * All rights reserved.
//  */

import {
  JestAsymmetricMatchers,
  JestChaiExpect,
  JestExtend,
} from "@vitest/expect";
import { use as chaiUse, expect } from "chai";
import {
  paper,
  CompoundPath,
  PathItem,
} from "../../packages/paper2/dist/paper2-core";

// TODO: remove eslint-disable comment and deal with errors over time
/* eslint-disable */

// allows using expect.extend instead of chai.use to extend plugins
chaiUse(JestExtend);
// adds all jest matchers to expect
chaiUse(JestChaiExpect);
// adds asymmetric matchers like stringContaining, objectContaining
chaiUse(JestAsymmetricMatchers);

function compareProperties(actual, expected, properties, message, options) {
  for (let i = 0, l = properties.length; i < l; i++) {
    const key = properties[i];
    equals(actual[key], expected[key], message + " (#" + key + ")", options);
  }
}

function compareItem(actual, expected, message, options, properties) {
  options = options || {};
  if (options.rasterize) {
    // comparePixels(actual, expected, message, options);
  } else if (!actual || !expected) {
    // QUnit.strictEqual(actual, expected, message);
  } else {
    // if (options.cloned) QUnit.notStrictEqual(actual.id, expected.id, message + ' (not #id)');
    // QUnit.strictEqual(actual.constructor, expected.constructor, message + ' (#constructor)');
    // When item is cloned and has a name, the name will be versioned:
    equals(
      actual.name,
      options.cloned && expected.name ? expected.name + " 1" : expected.name,
      message + " (#name)"
    );
    compareProperties(
      actual,
      expected,
      [
        "children",
        "bounds",
        "position",
        "matrix",
        "data",
        "opacity",
        "locked",
        "visible",
        "blendMode",
        "selected",
        "fullySelected",
        "clipMask",
        "guide",
      ],
      message,
      options
    );
    if (properties)
      compareProperties(actual, expected, properties, message, options);
    // Style
    var styles = [
      "fillColor",
      "strokeColor",
      "strokeCap",
      "strokeJoin",
      "dashArray",
      "dashOffset",
      "miterLimit",
    ];
    // if (expected instanceof TextItem) styles.push('fontSize', 'font', 'leading', 'justification');
    compareProperties(
      actual.style,
      expected.style,
      styles,
      message + " (#style)",
      options
    );
  }
}

export function compareBoolean(
  actual,
  expected,
  message = "",
  options = undefined
) {
  expected =
    typeof expected === "string" ? PathItem.create(expected) : expected;
  if (typeof actual === "function") {
    if (!message) message = getFunctionMessage(actual);
    actual = actual();
  }
  var parent,
    index,
    style = {
      strokeColor: "black",
      fillColor:
        (expected &&
          (expected.closed ||
            (expected.firstChild && expected.firstChild.closed && "yellow"))) ||
        null,
    };
  if (actual) {
    parent = actual.parent;
    index = actual.index;
    // Remove it from parent already now, in case we're comparing children
    // of compound-paths, so we can apply styling to them.
    if (parent && parent instanceof CompoundPath) {
      actual.remove();
    } else {
      parent = null;
    }
    actual.style = style;
  }
  if (expected) {
    expected.style = style;
  }

  equals(
    actual,
    expected,
    message,
    paper.Base.set({ rasterize: true }, options)
  );
  if (parent) {
    // Insert it back.
    parent.insertChild(index, actual);
  }
}

const comparators = {
  //   Null: QUnit.strictEqual,
  //   Undefined: QUnit.strictEqual,
  //   Boolean: QUnit.strictEqual,
  Number: function (actual, expected, message, options) {
    const tolerance = options?.tolerance ? options.tolerance : 1e-5;
    // Compare with a default tolerance of 1e-5:
    expect(Math.abs(actual - expected), message).lessThanOrEqual(tolerance);
    // var ok = Math.abs(actual - expected) <= Base.pick(options && options.tolerance, 1e-5);
    // QUnit.push(ok, ok ? expected : actual, expected, message);
  },
  Shape: function (actual, expected, message, options) {
    compareItem(actual, expected, message, options, [
      "shape",
      "size",
      "radius",
    ]);
  },
  Color: function (actual, expected, message, options) {
    if (actual && expected) {
      equals(actual.type, expected.type, message + " (#type)", options);
      // expect(actual.type, `${message} (#type)`).toBe(expected.type);

      // // NOTE: This also compares gradients, with identity checks and all.
      equals(
        actual.components,
        expected.components,
        message + " (#components)",
        options
      );
      // expect(actual.components, `${message} (#components)`).toEqual(expected.components);
    } else {
      // QUnit.push(expected.equals(actual), actual, expected, message);
    }
  },
  Project: function (actual, expected, message, options) {
    compareProperties(actual, expected, ["layers"], message, options);
  },
  Array: function (actual, expected, message, options) {
    // QUnit.strictEqual(actual.length, expected.length, message + ' (#length)');
    for (var i = 0, l = actual.length; i < l; i++) {
      equals(actual[i], expected[i], (message || "") + "[" + i + "]", options);
    }
  },
  Layer: function (actual, expected, message, options) {
    compareItem(actual, expected, message, options, undefined);
    // var sameProject = actual.project === expected.project;
    // var sharedProject = !(options && options.dontShareProject);
    // QUnit.push(sharedProject ? sameProject : !sameProject,
    //         actual.project,
    //         sharedProject ? expected.project : 'not ' + expected.project,
    //         message + ' (#project)');
  },
  Path: function (actual, expected, message, options) {
    compareItem(actual, expected, message, options, [
      "segments",
      "closed",
      "clockwise",
    ]);
  },
  Point: function (actual, expected, message, options) {
    comparators.Number(actual.x, expected.x, message + " (#x)", options);
    comparators.Number(actual.y, expected.y, message + " (#y)", options);
  },

  Size: function (actual, expected, message, options) {
    comparators.Number(
      actual.width,
      expected.width,
      message + " (#width)",
      options
    );
    comparators.Number(
      actual.height,
      expected.height,
      message + " (#height)",
      options
    );
  },

  Rectangle: function (actual, expected, message, options) {
    comparators.Point(actual, expected, message, options);
    comparators.Size(actual, expected, message, options);
  },
  Matrix: function (actual, expected, message, options) {
    comparators.Array(actual.values, expected.values, message, options);
  },
  Segment: function (actual, expected, message, options) {
    compareProperties(
      actual,
      expected,
      ["handleIn", "handleOut", "point", "selected"],
      message,
      options
    );
  },
  SegmentPoint: function (actual, expected, message, options) {
    comparators.Point(actual, expected, message, options);
    // comparators.Boolean(actual.selected, expected.selected, message + ' (#selected)', options);
    expect(actual.selected, `${message} (#selected)`).toBe(expected.selected);
  },
  Item: compareItem,
  CompoundPath: function (actual, expected, message, options) {
    compareItem(actual, expected, message, options, undefined);
  },
  Group: function (actual, expected, message, options) {
    compareItem(actual, expected, message, options, ["clipped"]);
  },
  SymbolItem: function (actual, expected, message, options) {
    compareItem(
      actual,
      expected,
      message,
      // Cloning SymbolItems does not result in cloned
      // SymbolDefinitions
      options && options.cloned
        ? paper.Base.set({}, options, { cloned: false })
        : options,
      ["symbol"]
    );
  },
  SymbolDefinition: function (actual, expected, message, options) {
    equals(
      actual.definition,
      expected.definition,
      message + " (#definition)",
      options
    );
  },
  PointText: function (actual, expected, message, options) {
    compareItem(actual, expected, message, options, ["content", "point"]);
  },
  Object: function (actual, expected, message, options) {
    const result = paper.Base.equals(actual, expected);
    expect(result).toBe(true);
    // QUnit.push(Base.equals(actual, expected), actual, expected, message);
  },
  Base: function (actual, expected, message, options) {
    comparators.Object(actual, expected, message, options);
  },
  Element: function (actual, expected, message, options) {
    // Convention: Loop through the attribute lists of both actual and
    // expected element, and compare values even if they may be inherited.
    // This is to handle styling values on SVGElement items more flexibly.
    equals(
      actual && actual.tagName,
      expected.tagName,
      (message || "") + " (#tagName)",
      options
    );
    for (var i = 0; i < expected.attributes.length; i++) {
      var attr = expected.attributes[i];
      if (attr.specified) {
        equals(
          actual && actual.getAttribute(attr.name),
          attr.value,
          (message || "") + " (#" + attr.name + ")",
          options
        );
      }
    }
    for (var i = 0; i < actual && actual.attributes.length; i++) {
      var attr = actual.attributes[i];
      if (attr.specified) {
        equals(
          attr.value,
          expected.getAttribute(attr.name)(message || "") +
            " #(" +
            attr.name +
            ")",
          options
        );
      }
    }
  },
};

export function getFunctionMessage(func) {
  var message = func
    .toString()
    .match(/^\s*function[^\{]*\{([\s\S]*)\}\s*$/)[1]
    .replace(/    /g, "")
    .replace(/^\s+|\s+$/g, "");
  if (/^return /.test(message)) {
    message = message.replace(/^return /, "").replace(/;$/, "");
  }
  return message;
}

export function equals(actual, expected, message = "", options = {}) {
  // Allow the use of functions for actual, which will get called and their
  // source content extracted for readable reports.
  if (typeof actual === "function") {
    if (!message) message = getFunctionMessage(actual);
    actual = actual();
  }

  // Get the comparator based on the expected value's type only and ignore the
  // actual value's type.
  var type = typeof expected,
    cls;

  type =
    (expected === null && "Null") ||
    (type === "number" && "Number") ||
    (type === "boolean" && "Boolean") ||
    (type === "undefined" && "Undefined") ||
    (Array.isArray(expected) && "Array") ||
    (expected instanceof window.Element && "Element") || // DOM Elements
    (cls = expected && expected._class) || // check _class 2nd last
    (type === "object" && "Object"); // Object as catch-all
  var comparator = type && comparators[type];

  if (!message) {
    message = type ? type.toLowerCase() : "value";
  }
  if (comparator) {
    comparator(actual, expected, message, options);
  } else if (expected && expected.equals) {
    // Fall back to equals
    // QUnit.push(expected.equals(actual), actual, expected, message);
    expect(actual).toEqual(expected);
  } else {
    // Finally perform a strict compare
    // QUnit.push(actual === expected, actual, expected, message);
    if (typeof actual === "object" || typeof expected === "object") {
      expect(actual).toEqual(expected);
    } else {
      expect(actual).toBe(expected);
    }
  }
  //   if (options && options.cloned && cls) {
  //     var identical = identicalAfterCloning[cls];
  //     QUnit.push(
  //       identical ? actual === expected : actual !== expected,
  //       actual,
  //       identical ? expected : 'not ' + expected,
  //       message + ': identical after cloning'
  //     );
  //   }
}
