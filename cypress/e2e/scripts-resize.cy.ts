/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Resize`, () => {
  const type = "scripts";
  const name = "resize";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      // cy.viewport(1280, 720); is the default
      cy.viewport(888, 720); // Resize the width smaller

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
