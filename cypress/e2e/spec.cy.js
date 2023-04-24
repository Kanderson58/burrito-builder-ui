describe('Burrito Ordering System', () => {
  beforeEach('', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', 
      {'orders': [
        { 'name': 'Example GET Order 1',
          'ingredients': ['GET ingredient 1', 'GET ingredient 2', 'GET ingredient 3']
        }
      ]}
    );

    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200
    });

    cy.visit('http://localhost:3000/');
  });


  it('should show users existing orders and an order form', () => {
    // User flow #1:  The user navigates to the page and can read existing orders as well as view an order form.  The order form should start empty, no ingredients should be listed in the "Order", and no error should be displayed.
    cy.get('h1').contains('Burrito Builder')
      .get('form').should('exist')
      .get('input').should('exist').should('have.value', '')
      .get('button').should('have.length', '13')
      .get('p').contains('Nothing selected')
      .get('span').should('not.exist');

    cy.get('.order').should('have.length', '1')
      .get('.order > :nth-child(1)').contains('Example GET Order 1')
      .get('.ingredient-list > :nth-child(1)').contains('GET ingredient 1')
      .get('.ingredient-list > :nth-child(2)').contains('GET ingredient 2')
      .get('.ingredient-list > :nth-child(3)').contains('GET ingredient 3');
  });

  it('should allow a user to submit an order that has  and show their order on submission', () => {
    // User flow #2:  The user can enter their information and submit an order, which is then displayed in the list of orders.  The order form should clear after submission.
    cy.get('.order').should('have.length', '1')
      .get('input').type('Example Order')
      .should('have.value', 'Example Order')
      .get('[name="beans"]').click()
      .get('p').contains('beans')
      .get('#submit').click()
      .get('.order').should('have.length', '2')
      .get(':nth-child(2) > h3').contains('Example Order')
      .get(':nth-child(2) > .ingredient-list > li').contains('beans');

    cy.get('input').should('have.value', '')
      .get('p').contains('Nothing selected');
  });

  it('should not allow a user to submit an order if the name field is not filled out or no ingredients are selected', () => {
    // User flow #3:  The user tries to submit order without filling out a name, or without selecting an ingredient, or both.  The user is notified of the error and asked to fill out all fields.  The order does not submit and will not appear on the page.
    cy.get('.order').should('have.length', '1')
      .get('#submit').click()
      .get('span').should('exist').contains('Please fill out both your name and at least one ingredient!')
      .get('.order').should('have.length', '1');

    cy.get('.order').should('have.length', '1')
      .get('input').type('Example Order')
      .get('#submit').click()
      .get('span').should('exist').contains('Please fill out both your name and at least one ingredient!')
      .get('.order').should('have.length', '1');

    cy.get('.order').should('have.length', '1')
      .get('[name="beans"]').click()
      .get('#submit').click()
      .get('span').should('exist').contains('Please fill out both your name and at least one ingredient!')
      .get('.order').should('have.length', '1');
  });
})