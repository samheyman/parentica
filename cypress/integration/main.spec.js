describe('Parentica', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    it('has a title', () => {
        cy.contains('Parentica');
    });

    it('can view online classes', () => {
        cy.get('#online-classes-btn').click();
        cy.get('.Mui-selected');
        cy.contains('online (');
    });

    it('can view Madrid classes', () => {
        cy.get('#madrid-classes-btn').click();
        cy.get('.Mui-selected');
        cy.contains('Madrid (');
    });

    it('can select topic', () => {
        cy.get('.tag-first').click();
        cy.get('.Mui-selected');
        cy.contains('Madrid (');
    });
})