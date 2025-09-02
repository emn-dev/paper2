/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Transform Testing`, () => {
  const type = "svg-export";
  const name = "transformTest1";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      cy.get("main").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 100, // If less than 100 pixels changed it is still a success
      });
    });
  });
});
