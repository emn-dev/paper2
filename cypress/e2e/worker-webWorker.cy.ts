/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: Web Worker`, () => {
  beforeEach(() => {
    cy.visit(`/worker-webWorker.html`);
    cy.wait(999); // Allow some time for canvas to be ready
  });

  describe("WHEN passing data to a web worker", () => {
    it("THEN should pass visual image compare", () => {
      const snapPath = "worker/webWorker";

      cy.get("main canvas").should("have.a.property", "resize");

      cy.get("canvas").matchImageSnapshot(snapPath);
    });
  });
});
