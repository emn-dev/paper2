/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Division Raster`, () => {
  const type = "showcase";
  const name = "divisionRaster";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").drag({ x: 0, y: 0 }, { x: 100, y: 100 });

      // Down
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 100, y: 300 });

      // Right
      cy.get("canvas").drag({ x: 100, y: 300 }, { x: 300, y: 300 });

      // Up
      cy.get("canvas").drag({ x: 300, y: 300 }, { x: 300, y: 150 });

      // Down
      cy.get("canvas").drag({ x: 300, y: 150 }, { x: 400, y: 400 });

      // Up
      cy.get("canvas").drag({ x: 400, y: 400 }, { x: 100, y: 100 });

      // Down
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 400, y: 400 });

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
