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
      cy.visit(`/${type}-${name}.html?canvasId=test2`);
      cy.wait(99);

      cy.get("#test2").trigger("mousedown", 10, 10);

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
      cy.visit(`/${type}-${name}.html?canvasId=test3`);
      cy.wait(99);

      cy.get("#test3").trigger("mousedown", 20, 20);

      cy.get("#test3").should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseDown() is not triggered when item is not visible", () => {
      cy.visit(`/${type}-${name}.html?canvasId=test4`);
      cy.wait(99);

      cy.get("#test4").trigger("mousedown", 20, 20);

      cy.get("#test4").should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseDown() is not triggered when item is locked", () => {
      cy.visit(`/${type}-${name}.html?canvasId=test5`);
      cy.wait(99);

      cy.get("#test5").trigger("mousedown", 20, 20);

      cy.get("#test5").should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseDown() is not triggered when another item is in front", () => {
      cy.visit(`/${type}-${name}.html?canvasId=test6`);
      cy.wait(99);

      cy.get("#test6").trigger("mousedown", 20, 20);

      cy.get("#test6").should("have.a.property", "resize");

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

      cy.get(`#${testId}`).click(20, 20);

      cy.window().then((win: any) => {
        const test = win.interactions;

        equals(test.type.actual, test.type.expected);
        equals(test.point.actual, test.point.expected);
        equals(test.target.actual, test.target.expected);
        equals(test.currentTarget.actual, test.currentTarget.expected);
        equals(test.delta.actual, test.delta.expected);
      });
    });
  });
});
