/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Raster (nodejs)`, () => {
  const type = "nodejs";
  const name = "raster";

  beforeEach(() => {
    cy.task("nodejsRaster");
    cy.wait(2_500); // Allow some time for nodejs script
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some extra time for loading
  });

  describe("WHEN drawing on the canvas", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("img").should("exist");

      cy.get("img").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
