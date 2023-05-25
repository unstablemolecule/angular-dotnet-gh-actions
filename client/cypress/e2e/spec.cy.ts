describe('template spec', () => {
    it('passes', () => {
        cy.visit('https://example.cypress.io');
    });

    it('should have forecast pre block', () => {
        cy.intercept('GET', `${Cypress.env('apiUrl')}/weatherforecast`).as('getWeatherForecast');
        cy.visit('/');
        cy.wait('@getWeatherForecast').then(() => {
            cy.get(`[data-cy="forecast"]`)
                .should('not.be.empty');
        });
    });
})