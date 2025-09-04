/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Animated Star`, () => {
  const type = "animated";
  const name = "booleanOps";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(2_100); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
