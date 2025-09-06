/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Meta Balls`, () => {
  const type = "showcase";
  const name = "metaBalls";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(333); // Allow some time for loading
  });

  describe("WHEN moving mouse on the canvas", () => {
    it("THEN should pass visual image compare", () => {
      cy.get("main canvas").should("have.a.property", "resize");

      // Start
      cy.get("canvas").drag({ x: 0, y: 0 }, { x: 100, y: 100 });

      // Down
      cy.get("canvas").drag({ x: 100, y: 100 }, { x: 100, y: 300 });

      // Right
      cy.get("canvas").drag({ x: 100, y: 300 }, { x: 300, y: 300 });

      cy.wait(333);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
