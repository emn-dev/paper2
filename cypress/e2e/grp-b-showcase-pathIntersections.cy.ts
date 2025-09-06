/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Path Intersections`, () => {
  const type = "showcase";
  const name = "pathIntersections";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN moving on the canvas", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").drag({ x: 0, y: 0 }, { x: 100, y: 100 });

      // Mousedown to see points
      cy.get("canvas").trigger("mousedown", {
        x: 100,
        y: 100,
      });

      // Down
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 100, y: 300 });

      // Right
      cy.get("canvas").drag({ x: 100, y: 300 }, { x: 300, y: 300 });

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
