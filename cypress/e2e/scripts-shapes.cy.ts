/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Shapes`, () => {
  beforeEach(() => {
    cy.visit(`/scripts-shapes.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "scripts/shapes";

      cy.get("main").matchImageSnapshot(snapPath);
    });
  });
});
