/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Inkscape`, () => {
  beforeEach(() => {
    cy.visit(`/svg-import-inkscape.html`);
    cy.wait(999); // Allow timeout to compelete
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "svg-import/inkscape";

      cy.get("main").matchImageSnapshot(snapPath);
    });
  });
});
