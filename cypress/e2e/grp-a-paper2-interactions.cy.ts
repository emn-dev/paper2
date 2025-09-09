/* eslint-disable cypress/no-unnecessary-waiting */
import { equals } from "../support/_helpers";

describe(`GIVEN: Interactions`, () => {
  const type = "paper2";
  const name = "Interactions";

  describe("WHEN mouse actions", () => {
    it("Item#onMouseDown()", () => {
      cy.visit(`/${type}-${name}.html?canvasId=test1`);
      cy.wait(99);

      cy.get("#test1").click(20, 20);

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

      cy.get("#test2").click(10, 10);

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

      cy.get("#test3").click(20, 20);

      cy.get("#test3").should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });

    it("Item#onMouseDown() is not triggered when item is not visible", () => {
      cy.visit(`/${type}-${name}.html?canvasId=test4`);
      cy.wait(99);

      cy.get("#test4").click(20, 20);

      cy.get("#test4").should("have.a.property", "resize");

      // This test succeeds if no error is thrown
    });
  });
});
