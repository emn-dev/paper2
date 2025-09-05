/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Bezier Tool`, () => {
  const type = "tools";
  const name = "bezierTool";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN drawing", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 100,
        y: 100,
      });
      cy.get("canvas").trigger("mouseup");

      // Down and Right
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 300, y: 300 });

      cy.get("canvas").trigger("mousedown", {
        x: 300,
        y: 300,
      });

      // Up and Right
      cy.get("canvas").drag({ x: 300, y: 300 }, { x: 500, y: 200 });

      cy.get("canvas").trigger("mouseup");

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
