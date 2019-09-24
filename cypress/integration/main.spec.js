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

    it('can select topic from class card, in Spanish', () => {
        cy.get('.language-selector-btn').eq(0).click();
        cy.get('#online-classes-btn').click();
        cy.contains('en línea').click();
        cy.get('#wrapped-tabpanel-1').find('.tag-baby').eq(0).click();
        cy.get('.result-filters').find('.tag-baby').should(($tag) => {
            const tag = $tag.text()
            expect(tag).eq('bebé')
        });
    });
})