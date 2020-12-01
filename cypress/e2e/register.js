import { buildUser } from '../support/generate'

describe('registration', () => {
    it('should register a new user', () => {
        const user = buildUser()
        
        cy.visit('/')
        cy.findByTestId(/homepage-sign-up-link/i)
            .click()
            
        cy.findByLabelText(/First Name/i)
        .type(user.first_name)
        
        cy.findByLabelText(/last name/i)
        .type(user.last_name)
        
        cy.findByLabelText(/username/i)
        .type(user.username)
        
        cy.findByLabelText(/email address/i)
        .type(user.email)
        
        cy.findByLabelText(/password/i)
        .type(user.password)

        cy.findByTestId(/submit-sign-up/i).click()

        cy.url().should('eq', `${Cypress.config().baseUrl}/`)

        cy.window()
            .its('localStorage.userInfo')
            .then(subject => {
                const parsedUserInfo = JSON.parse(subject)
                return parsedUserInfo
            })
            .should('be.a', 'object')
        cy.window()
            .its('localStorage.expiresAt')
            .should('be.a', 'string')
    })
})