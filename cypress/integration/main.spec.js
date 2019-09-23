describe('Parentica', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    it('can view homepage', () => {
        cy.contains('Parentica');
    });

    it('can view online classes', () => {
        cy.get('#online-classes-btn').click();
        cy.get('.Mui-selected');
        cy.contains('online (');
    });

    it('can view classes in Madrid', () => {
        cy.get('#madrid-classes-btn').click();
        cy.get('.Mui-selected');
        cy.contains('Madrid (');
    });

    it('can select topic', () => {
        cy.get('.tag-first').click();
        cy.get('.Mui-selected');
        cy.contains('Madrid (');
    });

    it('can select select class', () => {
        cy.get('#madrid-classes-btn').click();
        cy.get('.MuiCardActionArea-root').eq(2).click();
        cy.get('.MuiButton-label');
        cy.contains('Go to website');
    });

    // it('can select select other classes from provider' , () => {
    //     cy.get('#madrid-classes-btn').click();
    //     cy.get('.MuiCardActionArea-root').eq(2).click();
    //     cy.get('.MuiButton-label');
    //     cy.contains('Go to website');
    // });

    it('can view online classes in Spanish', () => {
        cy.get('.language-selector-btn').eq(0).click();
        cy.get('#online-classes-btn');
        cy.contains('en línea');
    });
})