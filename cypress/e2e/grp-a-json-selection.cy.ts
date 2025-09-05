/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Selection`, () => {
  const type = "json";
  const name = "selection";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(750); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
