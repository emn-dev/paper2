/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Circles`, () => {
  const type = "tools";
  const name = "circles";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN drawing", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 200,
        y: 200,
      });

      cy.get("canvas").drag({ x: 200, y: 200 }, { x: 300, y: 300 });

      cy.get("canvas").trigger("mouseup");

      cy.get("canvas").trigger("mousedown", {
        x: 350,
        y: 350,
      });

      cy.get("canvas").drag({ x: 350, y: 350 }, { x: 325, y: 250 });

      cy.get("canvas").trigger("mouseup");

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 50, // If less than 50 pixels changed it is still a success
      });
    });
  });
});
