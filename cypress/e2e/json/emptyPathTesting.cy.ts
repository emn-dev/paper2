/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Empty Path Testing (JSON)`, () => {
  beforeEach(() => {
    cy.visit(`/json-emptyPathTesting.html`);
    cy.wait(999); // Allow timeout to compelete
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "json/emptyPathTesting";

      cy.get("main").matchImageSnapshot(snapPath);
    });
  });
});
