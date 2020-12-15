import {buildCardSetName} from '../support/generate'

describe('Handles specific situations when editing a card set in editMode (you are editing your own card set)', () => {
  const {cardSetName} = buildCardSetName()
  it('adds new flashcards', () => {
    cy.createUserAndLogin().then(() => {
      cy.visit(`${Cypress.config().baseUrl}/cards-sets/new`)
      cy.createValidCardSet({cardSetName}).then(() => {
        cy.findByText(/Create Set/).click()
        //   cy.location('pathname', {timeout: 10000}).should(
        //     'include',
        //     /\/card-sets\/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        //   )
        cy.findByTestId(/edit-card-set/i).click()
        cy.findByTestId(/add-flashcard-fields/i).click()
        cy.addFlashcard({index: 2})
        cy.findByText(/save/i).click()
        // grab number from testid
        // click that many times to get to card
        // assert term is correct
        // assert definition is correct
      })
    })
  })
  it('updates old flashcards', () => {
    cy.createUserAndLogin().then(() => {
      cy.visit(`${Cypress.config().baseUrl}/cards-sets/new`)
      cy.createValidCardSet({cardSetName}).then(() => {
        cy.findByText(/Create Set/).click()
        cy.findByLabelText() // get first term and change the text
        cy.findByLabelText() // get the first definition and change the text
        cy.findByText(/save/i).click() // save card set
        // assert first term is a new value and not "term-0"
        // assert the first definition is a new value and not "definition-0"
      })
    })
  })

  it('preserves card set order', () => {
    // generate index array + 2
    cy.createUserAndLogin().then(() => {
      cy.visit(`${Cypress.config().baseUrl}/cards-sets/new`)
      cy.createValidCardSet({cardSetName}).then(() => {
        // add 3 more flashcards
        cy.findByText(/save/i).click() // save card set
        // get amount of flashcards from data-testid
        // assert flashcards order is preserved
        // assert each term is in the same order as flashcards variable saved here
        // assert each definition is in the same order as flashcards variable saved here
      })
    })
  })
  it('adds a flashcard, saves, and shows old flashcards and new flashcards on show page', () => {})
})
