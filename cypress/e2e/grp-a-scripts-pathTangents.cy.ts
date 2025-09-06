/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Path Tangents`, () => {
  const type = "scripts";
  const name = "pathTangents";

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
