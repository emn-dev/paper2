/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Compound Path (JSON)`, () => {
  beforeEach(() => {
    cy.visit(`/json-compoundPath.html`);
    cy.wait(999); // Allow timeout to compelete
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "json/compoundPath";

      cy.get("main").matchImageSnapshot(snapPath);
    });
  });
});
