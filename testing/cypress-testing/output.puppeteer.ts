
describe('Converted Puppeteer Test', () => {
  it('runs converted steps', () => {
    Cypress.config('defaultCommandTimeout', 5000)
    cy.viewport(802, 633)
    cy.visit("http://localhost:5173/")
    cy.get("nav button").eq(0).should('exist').click(41, 26)
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").eq(0).should('exist').click(232.875, 76)
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").eq(0).should('exist').type("cypress test")
    cy.get("html").eq(0).should('exist').click(666, 333)
    cy.contains("# deep").click(83, 25)
    cy.get("a > button").eq(0).should('exist').click(10.875, 24)
  })
})
