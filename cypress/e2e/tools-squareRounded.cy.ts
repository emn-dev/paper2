/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Square Rounded`, () => {
  beforeEach(() => {
    cy.visit(`/tools-squareRounded.html`);
    cy.wait(999); // Allow some time for canvas to be ready
  });

  describe("WHEN drawing a curving line", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "tools/squareRounded";

      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 100,
        y: 100,
      });

      // Down
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 100, y: 300 });

      // Right
      cy.get("canvas").drag({ x: 100, y: 300 }, { x: 300, y: 300 });

      // Up
      cy.get("canvas").drag({ x: 300, y: 300 }, { x: 300, y: 150 });

      // Left
      cy.get("canvas").drag({ x: 300, y: 150 }, { x: 150, y: 150 });

      // Up
      cy.get("canvas").drag({ x: 150, y: 150 }, { x: 150, y: 100 });

      // Stop
      cy.get("canvas").trigger("mouseup");

      cy.get("canvas").matchImageSnapshot(snapPath);
    });
  });
});
