
describe('Converted Puppeteer Test', () => {
  it('runs converted steps', () => {
    Cypress.config('defaultCommandTimeout', 5000)
    cy.viewport(802, 633)
    cy.visit("http://localhost:5173/")
    cy.get("nav button").click(41, 26)
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").click(232.875, 76)
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").type("cypress test")
    cy.get("html").click(666, 333)
    cy.get("body > div:nth-of-type(2) div:nth-of-type(6)").click(83, 25)
    cy.get("a > button").click(10.875, 24)
  })
})
