import { buildUser, buildNewFlashcard } from '../support/generate'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', (overrides) => {
    const user = buildUser(overrides)
    
    cy.request({
        url: 'http://localhost:8000/api/auth/register',
        method: "POST",
        body: user
    }).then(response => ({...response.body, ...user}))
})

Cypress.Commands.add('assertHome', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', (user) => {
    cy.window()
        .its('localStorage.expiresAt')
        .should('be.a', 'string')
    cy.window()
        .its('localStorage.userInfo')
        .then(subject => JSON.parse(subject))
        .should('be.a', 'object')

    
        cy.window()
        .its('localStorage')
        .then(subject => ({ ...JSON.parse(subject.userInfo), expiresAt: subject.expiresAt}))
        .should(userInfo => {
            const { first_name, last_name, id, username, email, expiresAt } = userInfo

            expect(first_name).to.equal(user.first_name)
            expect(last_name).to.equal(user.last_name)
            expect(username).to.equal(user.username)
            expect(email).to.equal(user.email)
            expect(id).to.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
            expect(expiresAt).to.match(/[0-9]{10}/i)
        })
})

Cypress.Commands.add('login', (user) => {
    cy.request({
        url: 'http://localhost:8000/api/auth/login',
        method: "POST",
        body: user
    }).then((response) => {
        window.localStorage.setItem('userInfo', JSON.stringify(response.body.userInfo))
        window.localStorage.setItem('expiresAt', response.body.expiresAt)
        return {...response.body.userInfo, expiresAt: response.body.expiresAt, ...user}
    })
})

Cypress.Commands.add('createUserAndLogin', () => {
    cy.createUser()
        .then(user => cy.login(user))
})

Cypress.Commands.add('logout', (user) => {
    cy.request({
        url: 'http://localhost:8000/api/auth/logout',
        method: "GET",    
    }).then(() => {
       cy.clearLocalStorage()
    }) 
})

Cypress.Commands.add("createValidCardSet", (options) => {
    cy.visit(`${Cypress.config().baseUrl}/card-sets/new`)
    cy.get('input[name="card-set-name"]').type(options.cardSetName)
    cy.get('input[name="term-0"]').type('test-term-1')
    cy.get('input[name="definition-0"]').type('test-definition-1')
    cy.get('input[name="term-1"]').type('test-term-2')
    cy.get('input[name="definition-1"]').type('test-definition-2')
})


Cypress.Commands.add('addFlashcard', ({term, definition, index}) => {
    cy.findByTestId("add-flashcard-fields").click()
    cy.findByTestId(term ?? new RegExp(`term-${index}`)).type(`test-term-${index + 1}`)
    cy.findByTestId(definition ?? RegExp(`definition-${index}`)).type(`test-definition-${index + 1}`)
})
