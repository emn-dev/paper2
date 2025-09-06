/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Stars`, () => {
  const type = "tools";
  const name = "stars";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN drawing", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 100,
        y: 100,
      });

      // Down
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 100, y: 200 });

      // Stop
      cy.get("canvas").trigger("mouseup");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 200,
        y: 200,
      });

      // Down
      cy.get("canvas").drag({ x: 200, y: 200 }, { x: 200, y: 300 });

      // Stop
      cy.get("canvas").trigger("mouseup");

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
