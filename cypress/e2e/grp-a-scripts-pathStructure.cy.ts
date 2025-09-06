/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Path Structure`, () => {
  const type = "scripts";
  const name = "pathStructure";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 100, // If less than 100 pixels changed it is still a success
      });
    });
  });
});
