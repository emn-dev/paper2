/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Boolean Ops (animated)`, () => {
  const type = "animated";
  const name = "booleanOps";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(1_500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("canvas").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 200, // If less than 200 pixels changed it is still a success
      });
    });
  });
});
