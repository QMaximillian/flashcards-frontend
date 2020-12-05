import { buildUser } from '../support/generate'

describe('login', () => {
    it('should login an existing user', () => {
        cy.createUser().then(user => {

            cy.visit('/')
    
    
    
            // tests begin
                
            cy.findByTestId(/homepage-login-link/i)
                .click()
    
            cy.findByLabelText(/email address/i)
            .type(user.email)
            
            cy.findByLabelText(/password/i)
            .type(user.password)
    
            cy.findByText(/sign in/i).click()

            cy.assertHome()
            cy.assertLoggedInAs(user)
        })

        
    })
})