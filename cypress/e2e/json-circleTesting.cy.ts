/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Circle Testing (JSON)`, () => {
  const type = "json";
  const name = "circleTesting";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(750); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = `${type}/${name}`;

      cy.get("main").matchImageSnapshot(snapPath);
    });
  });
});
