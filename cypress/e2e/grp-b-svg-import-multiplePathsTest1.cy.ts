/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Multiple Paths Test 1`, () => {
  const type = "svg-import";
  const name = "multiplePathsTest1";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      cy.get("main").matchImageSnapshot(`${type}/${name}`, {
        failureThreshold: 200, // If less than 200 pixels changed it is still a success
      });
    });
  });
});
