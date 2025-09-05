/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Text Testing`, () => {
  const type = "json";
  const name = "textTesting";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(750); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 50, // If less than 50 pixels changed it is still a success
      });
    });
  });
});
