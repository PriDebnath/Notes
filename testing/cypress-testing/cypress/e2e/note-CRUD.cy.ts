describe('Note CRUD', () => {

  const testApp = {
    url: "http://localhost:5173/"
  }
  const testData = {
    note_text: "cypress test content",
    tag_1: "simple",
    tag_2: "powerful",
  }

  beforeEach(() => {
    cy.viewport(716, 633)
    cy.visit(testApp.url)
  })

  it('Create a note', () => {
    cy.get("nav button").eq(0).should('exist').click(41, 26)
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").eq(0).should('exist').click(232.875, 76)
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").eq(0).should('exist').type(testData.note_text)
    cy.get("#root > div > div").eq(0).should('exist').click(522, 450)
    cy.get("html").click(695, 325)
    cy.get(`[aria-label="${testData.tag_1}"]`).click()
    cy.get("a > button").eq(0).should('exist').click(10.875, 24)
  })

  it('Read the note', () => {
    cy.contains(testData.note_text).eq(0).should("exist")
    cy.contains(testData.note_text).eq(0).should("exist").scrollIntoView().click({ force: true })
    cy.contains(testData.note_text).eq(0).should("exist")
  })

  it('Update the note', () => {
    cy.get("div:nth-of-type(1) > div:nth-of-type(1) > a > div").click()
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").click()
    cy.get("div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div").type(testData.note_text + " updated")
    cy.get("html").click()
    cy.get("#root > div > div").eq(0).should('exist').click(522, 450)
    cy.get("html").eq(0).should('exist').click(695, 325)

    cy.get(`[aria-label="${testData.tag_2}"]`).eq(0).should('exist').scrollIntoView().click({ force: true })
    cy.get("div.fixed > div > div > div:nth-of-type(1) button:nth-of-type(3) > svg").click()
    cy.get("a > button").click()
  })

  it('Delete the note', () => {
    cy.get('[aria-label="search-note"]').eq(0).should('exist').scrollIntoView().click(15, 10.015625, { force: true })
    cy.get('[aria-label="delete-1"]').eq(0).should('exist').scrollIntoView().click(15, 10.015625, { force: true })
    cy.get('[aria-label="delete"]').eq(0).should('exist').scrollIntoView().click(46.703125, 16.5, { force: true })
  })
})
