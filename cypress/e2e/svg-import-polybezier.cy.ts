/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Polybezier`, () => {
  const type = "svg-import";
  const name = "polybezier";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
