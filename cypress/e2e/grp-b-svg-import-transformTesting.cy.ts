/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Rransform Testing`, () => {
  const type = "svg-import";
  const name = "transformTesting";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
