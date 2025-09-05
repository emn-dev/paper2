/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Animated Star`, () => {
  const type = "animated";
  const name = "animatedStar";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(1_500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
