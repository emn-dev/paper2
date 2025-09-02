/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Grid`, () => {
  const type = "tools";
  const name = "grid";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN drawing", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 100,
        y: 100,
      });

      // Down and Right
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 300, y: 300 });

      // Up and Right
      cy.get("canvas").drag({ x: 300, y: 300 }, { x: 500, y: 200 });

      // Down
      cy.get("canvas").drag({ x: 500, y: 200 }, { x: 500, y: 400 });

      // Stop
      cy.get("canvas").trigger("mouseup");

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
