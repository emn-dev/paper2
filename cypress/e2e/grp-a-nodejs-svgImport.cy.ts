/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: SVG Import (nodejs)`, () => {
  const type = "nodejs";
  const name = "svgImport";

  beforeEach(() => {
    cy.task("nodejsSvgImport");
    cy.wait(2_000); // Allow some time for nodejs script
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
