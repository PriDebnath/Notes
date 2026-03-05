
describe('Converted Puppeteer Test', () => {
  it('runs converted steps', () => {
    Cypress.config('defaultCommandTimeout', 10000)
    cy.viewport(716, 633)
    cy.visit("http://localhost:5173/")
    cy.visit("http://localhost:5173/")
    cy.get("[aria-label=\"delete-21\"]").click(15, 10.015625)
    cy.get("[aria-label=\"delete\"]").click(46.703125, 16.5)
  })
})
