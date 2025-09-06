/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Empty Path Testing (JSON)`, () => {
  const type = "json";
  const name = "emptyPathTesting";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
