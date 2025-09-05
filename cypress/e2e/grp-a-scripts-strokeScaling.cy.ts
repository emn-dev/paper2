/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Shapes 2`, () => {
  const type = "scripts";
  const name = "strokeScaling";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`);

      // cy.get("main").matchImageSnapshot(`${type}/${name}`, {
      //   failureThreshold: 200, // If less than 200 pixels changed it is still a success
      // });
    });
  });
});
