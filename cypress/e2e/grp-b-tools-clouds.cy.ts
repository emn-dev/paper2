/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Clouds`, () => {
  const type = "tools";
  const name = "clouds";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN drawing", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 200,
        y: 200,
      });

      cy.get("canvas").drag({ x: 200, y: 200 }, { x: 400, y: 200 });

      cy.get("canvas").drag({ x: 400, y: 200 }, { x: 425, y: 300 });

      cy.get("canvas").drag({ x: 425, y: 300 }, { x: 100, y: 300 });

      cy.get("canvas").trigger("mouseup");

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
