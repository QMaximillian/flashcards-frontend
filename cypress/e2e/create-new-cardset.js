describe('create a small and a large card set and check the cards appear as entered', () => {
  it('Creates and submits a card set with less than 20 terms and definitions', () => {
    let randomNumberBelow20 = Math.floor(Math.random() * 18)
    var genArr = Array.from({length: randomNumberBelow20}, (_, k) => k + 2)
    const {cardSetName} = buildCardSetName()
    cy.createUserAndLogin().then(() => {
      cy.visit(`${Cypress.config().baseUrl}/cards-sets/new`)
      cy.createValidCardSet({cardSetName}).then(() => {
        cy.wrap(genArr).each(value => {
          cy.addFlashcard({index: value})
        })
      })
      cy.findByText(/Create Set/).click()
      // We're adding 3 to the randomNumber to account for 2 cards created when running `cy.createValidCardSet` and the final flashcard that is purely informational
      cy.findByTestId(/amount-of-flashcards/i).should(
        'have.text',
        randomNumberBelow20 + 3,
      )
    })
  })
  it('Creates and submits a card set with more than 30 but less than 50 terms and definitions', () => {
    let randomNumberBelow50 = Math.floor(Math.random() * (48 - 28) + 28)
    var indexes = Array.from({length: randomNumberBelow50}, (_, k) => k + 2)
    const {cardSetName} = buildCardSetName()
    cy.createUserAndLogin().then(() => {
      cy.visit(`${Cypress.config().baseUrl}/cards-sets/new`)
      cy.createValidCardSet({cardSetName}).then(() => {
        cy.wrap(indexes).each(index => {
          cy.addFlashcard({index})
        })
      })
      cy.findByText(/Create Set/).click()
      cy.findByTestId(/amount-of-flashcards/i).should(
        'have.text',
        randomNumberBelow50 + 3,
      )
    })
  })
})
