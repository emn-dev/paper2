/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Raster`, () => {
  const type = "json";
  const name = "raster";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(750); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      // cy.wait(750); // Allow some time for loading
      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
