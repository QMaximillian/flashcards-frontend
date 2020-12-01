// describe('form validation', () => {
//     before(() => {
//         login()
//     })
//     it('prevents user from creating card-set without creating 2 flashcards', () => {
//         cy.findByTestId(/create-card-set-link/).click()
//         cy.get('input[name="card-set-name"').type('Hello')
//         cy.get('input[name="term-0"').type('test-term-1')
//         cy.get('input[name="definition-0"').type('test-definition-1')
//         // cy.get('input[name="term-1"').type('test-term-2')
//         // cy.get('input[name="definition-1"').type('test-definition-2')
//         cy.findByText(/Create Set/).click()
//         cy.on('window:alert', (txt) => {
//             expect(txt).to.contains('Please delete or complete term and definition for all flashcards')
//         })

//     })
// })