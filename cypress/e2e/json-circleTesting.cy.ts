/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Circle Testing (JSON)`, () => {
  beforeEach(() => {
    cy.visit(`/json-circleTesting.html`);
    cy.wait(999); // Allow timeout to compelete
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "json/circleTesting";

      cy.get("main").matchImageSnapshot(snapPath);
    });
  });
});
