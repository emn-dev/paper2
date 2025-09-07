/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Gradients 2`, () => {
  const type = "svg-import";
  const name = "gradients2";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      cy.wait(333);

      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
