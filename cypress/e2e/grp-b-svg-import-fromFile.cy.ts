/* eslint-disable cypress/no-unnecessary-waiting */
describe(`GIVEN: From File`, () => {
  const type = "svg-import";
  const name = "fromFile";

  beforeEach(() => {
    cy.visit(`/${type}-${name}.html`);
    cy.wait(250); // Allow some time for loading
    cy.get("paper2-nav").invoke("remove");
  });

  describe("WHEN page has loaded", () => {
    it("THEN should pass visual image compare", () => {
      cy.get('input[type="file"]').selectFile(
        "cypress/fixtures/svgviewer-output.svg"
      );

      cy.wait(250);

      cy.get("canvas").matchImageSnapshot(`${type}/${name}`);
    });
  });
});
