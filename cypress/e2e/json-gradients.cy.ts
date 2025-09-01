/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Gradients (JSON)`, () => {
  beforeEach(() => {
    cy.visit(`/json-gradients.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "json/gradients";

      cy.get("main").matchImageSnapshot(snapPath);
    });
  });
});
