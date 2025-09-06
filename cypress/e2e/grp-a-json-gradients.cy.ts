/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Gradients (JSON)`, () => {
  const type = "json";
  const name = "gradients";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
