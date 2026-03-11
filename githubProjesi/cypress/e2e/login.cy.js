/// <reference types="cypress" />

describe('Login Form Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('a) Başarılı form doldurulduğunda submit edebiliyorum', () => {

    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type('Aa123456@');
    cy.get('input[name="term"]').check();

    cy.get('.invalid-feedback').should('not.exist');
    cy.get('button').should('not.be.disabled');

    cy.get('button').click();

    cy.url().should('include', '/success');
    cy.contains('Success').should('exist');

  });

});