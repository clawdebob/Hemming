describe('My First Test', function() {

    it('Visiting url', () => {
        cy.visit('http://localhost:8080/');
    });

    it('checking title', () => {
        cy.contains('Код Хэмминга');
    });

    it('typing code "1010"', () => {
        cy.get('.codeInput')
            .type('1010')
            .should('have.value', '1010');
    });

    it('Should click button', () => {
        cy.get('button').click();
    });

    it('should find results section in dom tree', () => {
        cy.get('.results');
    });

    it('should find table in dom tree', () => {
        cy.get('#tact-table');
    });

    it('should find all three bit arrays', () => {
        cy.get('.results__bitArray').should('have.length', 3);
    });
});
