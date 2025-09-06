/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Vektor`, () => {
  const type = "tools";
  const name = "vektor";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN drawing with Vektor", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 100,
        y: 100,
      });

      // Right
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 300, y: 100 });

      // Down
      cy.get("canvas").drag({ x: 300, y: 100 }, { x: 300, y: 300 });

      // Stop
      cy.get("canvas").trigger("mouseup");

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 400, // If less than 400 pixels changed it is still a success
      });
    });
  });
});
