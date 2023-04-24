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
      'name': 'Example POST Order',
      'ingredients': ['ingredient POST 1', 'ingredient POST 2', 'ingredient POST 3']
    })

    cy.visit('http://localhost:3000/');
  });


  it('should show users existing orders and an order form', () => {
    // User flow #1:  The user navigates to the page and can read existing orders as well as view an order form.
    cy.get('h1').contains('Burrito Builder')
      .get('form').should('exist')
      .get('input').should('exist')
      .get('button').should('have.length', '13');

    cy.get('.order').should('have.length', '1')
      .get('.order > :nth-child(1)').contains('Example GET Order 1')
      .get('.ingredient-list > :nth-child(1)').contains('GET ingredient 1')
      .get('.ingredient-list > :nth-child(2)').contains('GET ingredient 2')
      .get('.ingredient-list > :nth-child(3)').contains('GET ingredient 3');
  });

  it('should allow a user to submit an order that has  and show their order on submission', () => {
    // User flow #2:  The user can enter their information and submit an order, which is then displayed in the list of orders.
  });

  it('should not allow a user to submit an order if the name field is not filled out or no ingredients are selected', () => {
    // User flow #3:  The user tries to submit order without filling out a name, or without selecting an ingredient, or both.  The user is notified of the error and asked to fill out all fields.  The order does not submit and will not appear on the page.
  });
})