describe("Recorded flow", () => {
  it("replays user actions", () => {
    // viewport recorded: 802x633
cy.viewport(802, 633);
    cy.visit("http://localhost:5173/");
    cy.contains("new")   [role="\button\"].click(29, 26);
    cy.contains("editor")   [role="\paragraph\"].click(113.875, 13);
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div")
  .clear()
  .type("cypress content");
    cy.get("html").click(681, 325);
    cy.contains("# simple").click(84, 17);
    cy.contains("cypress contentPFont size→← TableTag#simple").click(389.875, 314);
    cy.get("[role=\"\link\\"]   [role=\"\button\\"]").click(14.875, 13);
  });
});
