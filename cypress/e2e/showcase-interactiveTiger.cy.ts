/* eslint-disable cypress/no-unnecessary-waiting */

describe(`GIVEN: Interactive Tiger`, () => {
  const type = "showcase";
  const name = "interactiveTiger";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(500); // Allow some time for loading
  });

  describe("WHEN moving some tiger pieces", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "showcase/chain";

      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").trigger("mousedown", {
        x: 450,
        y: 350,
      });

      // Left
      cy.get("canvas").drag({ x: 450, y: 350 }, { x: 200, y: 350 });

      // Stop
      cy.get("canvas").trigger("mouseup");

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
