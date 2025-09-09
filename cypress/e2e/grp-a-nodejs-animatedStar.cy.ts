/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: AnimatedStar (nodejs)`, () => {
  const type = "nodejs";
  const name = "animatedStar";

  beforeEach(() => {
    cy.task("nodejsAnimatedStar");
    cy.wait(6_500); // Allow some time for nodejs script
    cy.visit(`/${type}-${name}.html`);
    cy.wait(999); // Allow some extra time for loading
  });

  describe("WHEN drawing on the canvas", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("#myImg1").should("exist");
      cy.get("#myImg2").should("exist");

      cy.get("main").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
