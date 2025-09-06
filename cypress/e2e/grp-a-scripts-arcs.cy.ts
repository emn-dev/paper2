/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Arcs`, () => {
  const type = "scripts";
  const name = "arcs";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
