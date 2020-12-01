import { buildUser } from '../support/generate'

describe('login', () => {
    it('should login an existing user', () => {
        const user = buildUser('postgres')
        cy.visit('/')
        cy.request({
            url: 'http://localhost:8000/api/auth/register',
            method: "POST",
            body: user
        })


        // tests begin
            
        cy.findByTestId(/homepage-login-link/i)
            .click()

        cy.findByLabelText(/email address/i)
        .type(user.email)
        
        cy.findByLabelText(/password/i)
        .type(user.password)

        cy.findByText(/sign in/i).click()

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