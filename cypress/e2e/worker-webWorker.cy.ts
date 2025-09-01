/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Web Worker`, () => {
  const type = "worker";
  const name = "webWorker";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(999); // Allow extra time for loading
  });

  describe("WHEN passing data to a web worker", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = `${type}/${name}`;

      cy.get("main canvas").should("have.a.property", "resize");

      cy.get("canvas").matchImageSnapshot(snapPath);
    });
  });
});
