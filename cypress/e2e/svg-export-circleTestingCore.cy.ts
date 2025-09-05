/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Export Circle (Core)`, () => {
  const type = "svg-export";
  const name = "circleTestingCore";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
