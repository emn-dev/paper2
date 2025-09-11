/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: SVG Export (nodejs)`, () => {
  const type = "nodejs";
  const name = "svgExport";

  beforeEach(() => {
    cy.task("nodejsSvgExport");
    cy.wait(2_000); // Allow some time for nodejs script
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some extra time for loading
  });

  describe("WHEN drawing on the canvas", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("#mySvg1").should("exist");

      cy.get("#mySvg1").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
