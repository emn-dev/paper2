/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Tiger`, () => {
  const type = "svg-import";
  const name = "tiger";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      cy.get("main").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 500, // If less than 500 pixels changed it is still a success
      });
    });
  });
});
