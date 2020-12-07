const {buildCardSetName} = require('../support/generate')

describe('form validation', () => {
  beforeEach(() => {
    cy.createUserAndLogin()
  })

  it('prevents user from creating card-set without creating a card name', () => {
    cy.visit(`${Cypress.config().baseUrl}/card-sets/new`)
    cy.findByLabelText(/title/i).clear()
    cy.findByText(/Create Set/).click()

    cy.on('window:alert', txt => {
      expect(txt).to.eq('Must enter a card name')
    })
  })
  it('prevents user from creating card-set without creating 2 flashcards', () => {
    cy.visit(`${Cypress.config().baseUrl}/card-sets/new`)
    cy.get('input[name="card-set-name"').type('Hello')
    cy.get('input[name="term-0"]').type('test-term-1')
    cy.get('input[name="definition-0"]').type('test-definition-1')
    cy.get('input[name="term-1"]').type('test-term-2')
    cy.get('input[name="definition-1"]').type('test-definition-2')
    cy.findByText(/Create Set/).click()
    cy.on('window:alert', txt => {
      expect(txt).to.eq(
        'Please delete or complete term and definition for all flashcards',
      )
    })
  })

  it('prevents users from creating card-set with non-unique terms', () => {
    cy.visit(`${Cypress.config().baseUrl}/card-sets/new`)
    cy.get('input[name="card-set-name"]').type('Hello')
    cy.get('input[name="term-0"]').type('test-term-1')
    cy.get('input[name="definition-0"]').type('test-definition-1')
    cy.get('input[name="term-1"]').type('test-term-1')
    cy.get('input[name="definition-1"]').type('test-definition-2')
    cy.findByText(/Create Set/).click()
    cy.on('window:alert', txt => {
      expect(txt).to.eq('All terms must be unique')
    })
  })

  it('prevents users from creating card-set with non-unique terms', () => {
    cy.visit(`${Cypress.config().baseUrl}/card-sets/new`)
    cy.get('input[name="card-set-name"]').type('Hello')
    cy.get('input[name="term-0"]').type('test-term-0')
    cy.get('input[name="definition-0"]').type('test-definition-0')
    cy.get('input[name="term-1"]').type('test-term-1')
    cy.get('input[name="definition-1"]').type('test-definition-1')
    cy.findByText(/Create Set/).click()
    cy.on('window:alert', txt => {
      expect(txt).to.eq(
        'Please delete or complete term and definition for all flashcards',
      )
    })
  })

  it('prevents users from creating card-set with one field from a individual flashcard unfilled', () => {
    cy.visit(`${Cypress.config().baseUrl}/card-sets/new`)
    cy.get('input[name="card-set-name"]').type('Hello')
    cy.get('input[name="term-0"]').type('test-term-0')
    cy.get('input[name="definition-1"]').type('test-definition-1')
    cy.findByText(/Create Set/).click()
    cy.on('window:alert', txt => {
      expect(txt).to.eq(
        'Please complete flashcard term or definition in all rows',
      )
    })
  })
})

describe('handles card set privacy correctly', () => {
  it('creates a private flashcard', () => {
    const {cardSetName} = buildCardSetName()
    cy.createUserAndLogin().then(() => {
      cy.visit(`${Cypress.config().baseUrl}/`)
      cy.createValidCardSet({cardSetName}).then(() => {
        cy.findByTestId(/select-privacy/i).select('true')
        cy.findByText(/Create Set/).click()

        cy.logout()

        cy.findByTestId(/navigation-search-button/i).click()
        cy.findByTestId(/navigation-search-input/i)
          .type(cardSetName)
          .type('{enter}')
        cy.findByTestId(/card-set-name-0/i).should('not.exist')
      })
    })
  })

  it('creates a public flashcard', () => {
    const {cardSetName} = buildCardSetName()
    cy.createUserAndLogin().then(() => {
      cy.visit(`${Cypress.config().baseUrl}/`)
      cy.createValidCardSet({cardSetName}).then(() => {
        cy.findByTestId(/select-privacy/i).select('false')
        cy.findByText(/Create Set/).click()
        cy.logout()

        cy.findByTestId(/navigation-search-button/i).click()
        cy.findByTestId(/navigation-search-input/i)
          .type(cardSetName)
          .type('{enter}')
        cy.findByTestId(/card-set-name-0/i).contains(cardSetName)
      })
    })
  })
})

describe('create a small and a large card set and check the cards appear as entered', () => {
  it.only('Creates and submits a card set with less than 20 terms and definitions', () => {
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
  it.only('Creates and submits a card set with more than 30 but less than 50 terms and definitions', () => {
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

describe('Handles specific situations when editing a card set in editMode (you are editing your own card set)', () => {})

describe('Handles specific situations when customizing a card set (someone else has made one, you are copying and changing it', () => {})
