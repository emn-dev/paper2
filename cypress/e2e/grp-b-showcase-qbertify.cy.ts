/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Q*bertify`, () => {
  const type = "showcase";
  const name = "qbertify";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN canvas is done loading", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      cy.wait(500); // Allow some more time for loading

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
