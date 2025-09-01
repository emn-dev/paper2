/* eslint-disable no-console */
import { JSDOM } from 'jsdom';
// import { Canvas } from 'canvas'; // You can use node-canvas for most complete server-side canvas

if (globalThis.process?.release?.name) {
  console.log('We are running in NodeJS');
  const dom = new JSDOM(`<!DOCTYPE html>`);

  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.XMLSerializer = dom.window.XMLSerializer;
  globalThis.self = dom.window.self;
  if (!globalThis.navigator) {
    globalThis.navigator = dom.window.navigator;
  }

  // global.window.HTMLCanvasElement = Canvas; // You can use node-canvas for most complete server-side canvas
} else {
  console.log('Unknown runtime!');
}

if (globalThis.window) {
  const canvasCxtFunctText = window.HTMLCanvasElement.prototype.getContext.toString();

  if (canvasCxtFunctText.includes(' throw ')) {
    console.log('NOT real canvas');
    // This cannot be the real canvas, so let us mock out the 'getContext' funct
    // @ts-expect-error
    window.HTMLCanvasElement.prototype.getContext = () => {
      return {
        fillRect() {},
        clearRect() {},
        getImageData(x, y, w, h) {
          return {
            data: new Array(w * h * 4),
          };
        },
        putImageData() {},
        createImageData() {
          return [];
        },
        setTransform() {},
        drawImage() {},
        save() {},
        fillText() {},
        restore() {},
        beginPath() {},
        moveTo() {},
        lineTo() {},
        closePath() {},
        stroke() {},
        translate() {},
        scale() {},
        rotate() {},
        arc() {},
        fill() {},
        measureText() {
          return { width: 0 };
        },
        transform() {},
        rect() {},
        clip() {},
        bezierCurveTo() {},
      };
    };

    // jsdom's 'getContext' function looks like this (asOf jsdom v26):
    // getContext(contextId) {
    //     const esValue = this !== null && this !== undefined ? this : globalObject;
    //     if (!exports.is(esValue)) {
    //       throw new globalObject.TypeError(
    //         "'getContext' called on an object that is not a valid instance of HTMLCanvasElement."
    //       );
    //     }

    //     if (arguments.length < 1) {
    //       throw new globalObject.TypeError(
    //         `Failed to execute 'getContext' on 'HTMLCanvasElement': 1 argument required, but only ${arguments.length} present.`
    //       );
    //     }
    //     const args = [];
    //     {
    //       let curArg = arguments[0];
    //       curArg = conversions["DOMString"](curArg, {
    //         context: "Failed to execute 'getContext' on 'HTMLCanvasElement': parameter 1",
    //         globals: globalObject
    //       });
    //       args.push(curArg);
    //     }
    //     for (let i = 1; i < arguments.length; i++) {
    //       let curArg = arguments[i];
    //       curArg = conversions["any"](curArg, {
    //         context: "Failed to execute 'getContext' on 'HTMLCanvasElement': parameter " + (i + 1),
    //         globals: globalObject
    //       });
    //       args.push(curArg);
    //     }
    //     return utils.tryWrapperForImpl(esValue[implSymbol].getContext(...args));
    //   }
  } else {
    console.log('probably the real canvas, so no mocking');
    // This is probably the real canvas, so we do not need to do anything
    // The real 'getContext' should look something like this:
    //   function (contextType, contextAttributes) {
    //   if (contextType == '2d') {
    //     const ctx = this._context2d || (this._context2d = new Context2d(this, contextAttributes))
    //     this.context = ctx
    //     ctx.canvas = this
    //     return ctx
    //   }
    // }
  }
}
