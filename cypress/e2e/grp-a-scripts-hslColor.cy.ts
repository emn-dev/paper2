/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: HslColor`, () => {
  const type = "scripts";
  const name = "hslColor";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
