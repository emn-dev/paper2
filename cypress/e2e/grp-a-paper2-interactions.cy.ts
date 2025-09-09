/* eslint-disable cypress/no-unnecessary-waiting */
import { equals } from "../support/_helpers";

describe(`GIVEN: Interactions`, () => {
  const type = "paper2";
  const name = "interactions";

  describe("WHEN mouse actions", () => {
    it("Item#onMouseDown()", () => {
      const testId = "test1";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onMouseDown() with stroked item", () => {
      const testId = "test2";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 10, 10);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onMouseDown() is not triggered when item is not filled", () => {
      const testId = "test3";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseDown() is not triggered when item is not visible", () => {
      const testId = "test4";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseDown() is not triggered when item is locked", () => {
      const testId = "test5";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseDown() is not triggered when another item is in front", () => {
      const testId = "test6";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    // TODO: not sure what this test proves?
    it.skip("Item#onMouseDown() is not triggered if event target is document", () => {
      const testId = "test7";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}Span`).trigger("mousedown", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseMove()", () => {
      cy.visit(`/${type}-${name}.html?canvasId=test8`);
      cy.wait(99);

      cy.get("#test8").trigger("mousemove", 20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onMouseMove() is not re-triggered if point is the same", () => {
      const testId = "test9";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousemove", 20, 20);
      cy.get(`#${testId}`).trigger("mousemove", 20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test, 1);
      });
    });

    it("Item#onMouseUp()", () => {
      const testId = "test10";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onMouseUp() is only triggered after mouse down", () => {
      const testId = "test11";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mouseup", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onClick()", () => {
      const testId = "test12";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onClick() is not triggered if up point is not on item", () => {
      const testId = "test13";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 75);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onClick() is not triggered if down point is not on item", () => {
      const testId = "test14";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 75);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onDoubleClick()", () => {
      const testId = "test15";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);
      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onDoubleClick() is not triggered if both clicks are not on same item", () => {
      const testId = "test16";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);
      cy.get(`#${testId}`).trigger("mousedown", 35, 35);
      cy.get(`#${testId}`).trigger("mouseup", 35, 35);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onDoubleClick() is not triggered if time between both clicks is too long", () => {
      const testId = "test17";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);
      cy.wait(301);
      cy.get(`#${testId}`).trigger("mousedown", 20, 20);
      cy.get(`#${testId}`).trigger("mouseup", 20, 20);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseEnter()", () => {
      const testId = "test18";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousemove", 20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onMouseEnter() is only re-triggered after mouse leave", () => {
      const testId = "test19";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      // enter
      cy.get(`#${testId}`).trigger("mousemove", 8, 8);
      cy.get(`#${testId}`).trigger("mousemove", 12, 12);
      cy.get(`#${testId}`).trigger("mousemove", 16, 16);

      // leave
      cy.get(`#${testId}`).trigger("mousemove", 8, 8);

      // re-enter
      cy.get(`#${testId}`).trigger("mousemove", 12, 12);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test, 2);
      });
    });

    it("Item#onMouseLeave()", () => {
      const testId = "test20";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousemove", 12, 12);
      cy.get(`#${testId}`).trigger("mousemove", 8, 8);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onMouseDrag()", () => {
      const testId = "test21";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 12, 12);
      cy.get(`#${testId}`).trigger("mousemove", 8, 8);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });

    it("Item#onMouseDrag() is not triggered after mouse up", () => {
      const testId = "test22";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 12, 12);
      cy.get(`#${testId}`).trigger("mousemove", 14, 14);
      cy.get(`#${testId}`).trigger("mouseup", 14, 14);
      cy.get(`#${testId}`).trigger("mousemove", 16, 16);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test, 1);
      });
    });

    it("Item#onMouseDrag() is not triggered if mouse down was on another item", () => {
      const testId = "test23";

      cy.visit(`/${type}-${name}.html?canvasId=${testId}`);
      cy.wait(99);

      cy.get(`#${testId}`).trigger("mousedown", 35, 35);
      cy.get(`#${testId}`).trigger("mousemove", 45, 45);

      cy.get(`#${testId}`).should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });
  });
});
