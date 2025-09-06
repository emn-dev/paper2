/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Chain`, () => {
  const type = "showcase";
  const name = "chain";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN drawing a curving line", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").drag({ x: 0, y: 0 }, { x: 100, y: 100 });

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

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
