describe('Project - Form Elements', () => {

    it('Test Case 01 - Validate the Contact Us information',() => {
        cy.visit('https://techglobal-training.com/frontend/project-1')
        const text = ['Contact Us', '2860 S River Rd Suite 480, Des Plaines, IL 60018', 'info@techglobalschool.com', '(773) 257-3010']
        cy.get('div > .mb-5').children().each(($el, index) => {
            cy.wrap($el).should('have.text', text[index])
        })

    }),

    it('Test Case 02 - Validate the Full name input box',() => {

        // I also included this in my automated tests below 
        // Just to show 2 ways to do it.
        
        cy.visit('https://techglobal-training.com/frontend/project-1')

        cy.get('form > :nth-child(1)').as('fullNameBox')

        cy.get('@fullNameBox').find('input').should('be.visible').and('have.attr','required')

        cy.get('@fullNameBox').find('input').should('have.attr', 'placeholder', 'Enter your full name')
        
        cy.get('@fullNameBox').find('label').should('have.text','Full name *')
       
    }),

     /**
         * Navigate to https://techglobal-training.com/frontend/project-1
         *Validate the label is “Gender *”
         *Validate that the Gender is required
         *Validate the options are “Female”, “Male” and “Prefer not to disclose”
         *Validate the options are clickable and not selected
         *Click on the “Male” option and validate it is selected while the others are not selected
         *Click on the “Female” option and validate it is selected while the others are not selected
         */

       
    
    it('Test Case 03 - Validate the Gender radio button', () => {

            cy.visit('https://techglobal-training.com/frontend/project-1')
          
            cy.get('.control > .label').should('have.text', 'Gender *')
          
            const genderText = ['Male','Female','Prefer not to disclose']
          
            cy.get('.control > .radio').each(($el, index) => {
          
              cy.wrap($el).should('have.text', genderText[index]).and('not.be.checked')
          
              cy.wrap($el).contains(genderText[index]).click()
          
              cy.wrap($el).should('be.checked')
          
              cy.get('.control > .radio').not($el).should('not.be.checked')
          
            })
          
          })

    const testData = [

        {
            description: 'Validate the Full name input box',
            label:'Full name *',
            placeholder:'Enter your full name',
            required: true
        }
        ,{
        description: 'Validate the Address input box',
        label:'Address',
        placeholder:'Enter your address',
        required: false
    },
    { 
    description: 'Validate the Email input box',
    label:'Email *',
    placeholder:'Enter your email',
    required: true
    },
    {
        description: 'Validate the Phone input box',
        label:'Phone',
        placeholder:'Enter your phone number',
        required: false
    },
    {
        description: 'Validate the Message input box',
        label:'Message',
        placeholder:'Type your message here...',
        required: false
    },

]  
testData.forEach((test, index) => {

    it.only(`Test Case 0${index + 4} - ${test.description}`, () => {
        cy.visit('https://techglobal-training.com/frontend/project-1')
    
        cy.contains('.label', test.label).should('have.text', test.label)
    
        cy.contains('.label', test.label).parent().find('input,textarea').should('be.visible')
         .and('have.attr', 'placeholder', test.placeholder)
        .and(test.required ? 'have.attr' : 'not.have.attr', 'required')
    })
})

  
    it('Test Case 09 - Validate the consent checkbox',() => {
        cy.visit('https://techglobal-training.com/frontend/project-1')
        /**
         * Navigate to https://techglobal-training.com/frontend/project-1
         *Validate the label is “I give my consent to be contacted.”
         *Validate that the Consent checkbox is required
         *Validate that the Consent checkbox is clickable
         *Click on the “I give my consent to be contacted.” checkbox and validate it is selected
         *Click on the “I give my consent to be contacted.” checkbox again and validate it is not selected
         */
         
         cy.get('.checkbox ').as('checkboxLabel')

         cy.get('@checkboxLabel').should('have.text',' I give my consent to be contacted.')

         cy.get('.checkbox > input ').as('checkboxInput')

         cy.get('@checkboxInput').should('have.attr','required')

         cy.get('@checkboxInput').click().as('clicked')

         cy.get('@clicked').should('be.checked')

         cy.get('@clicked').click().should('not.be.checked')


    }),

    it('Test Case 10 - Validate the SUBMIT button',() => {
        cy.visit('https://techglobal-training.com/frontend/project-1')

        /**
         * Navigate to https://techglobal-training.com/frontend/project-1
         *Validate the “SUBMIT” button is displayed
         *Validate the “SUBMIT” button is clickable
         *Validate that the button text is “SUBMIT”
         */

         cy.get('div > .control .button').should('be.visible').and('be.enabled').and('have.text', 'SUBMIT')


        
    }),

    it('Test Case 11 - Validate the form submission',() => {

        /**
         * Navigate to https://techglobal-training.com/frontend/project-1
            Enter a first name
            Select a gender
            Enter an address
            Enter an email
            Enter a phone number
            Enter a message
            Select the “I give my consent to be contacted.” checkbox
            Click on the “SUBMIT” button
            Validate the form message “Thanks for submitting!” is displayed under the “SUBMIT” button
         */

        cy.visit('https://techglobal-training.com/frontend/project-1')

        const textInputs = ['Ramez Karim','1565 yourmom', 'yourmom@gmail.com','2246224481','Hi How are you?']
        cy.get('.input , .textarea').as('textInput').each(($el,index) => {
            cy.wrap($el).type(textInputs[index])
        })
        cy.get('.control > .radio').contains('Male').realClick()

        cy.get('.checkbox > input ').realClick()

        cy.get('.button').realClick()

        Cypress.on('uncaught:exception', () => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })

        cy.get('.mt-5').should('have.text','Thanks for submitting!')


    })

})
