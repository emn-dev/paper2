/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Simplify`, () => {
  const type = "showcase";
  const name = "simplify";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN drawing on the canvas", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Mousedown to see points
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

      cy.get("canvas").trigger("mouseup");

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
