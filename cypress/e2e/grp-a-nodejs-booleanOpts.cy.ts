/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Boolean Opts (nodejs)`, () => {
  const type = "nodejs";
  const name = "booleanOpts";

  beforeEach(() => {
    cy.task("nodejsBooleanOpts");
    cy.wait(999); // Allow some time for http server
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN drawing on the canvas", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("img").should("exist");

      cy.get("img").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
