describe('Parentica', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/en');
    })

    it('can view homepage', () => {
        cy.contains('Parentica');
        cy.contains('Madrid');
        cy.contains('Online');
    });

    it('can view online classes section on homepage', () => {
        cy.get('.online-classes');
        cy.get('h2');
        cy.contains('Online');
    });

    it('can select online seminars from homepage', () => {
        cy.get('.type-card-webinars').click();
        cy.get('.Mui-selected');
        cy.contains('Seminars');
    });

    it('can select Spanish classes from homepage', () => {
        cy.get('.spanish-card').click();
        cy.get('h2');
        cy.contains('Online');
        cy.get('.tag');
        cy.contains('Spanish');
    });

    it('can view classes in Madrid', () => {
        cy.get('.madrid-card').click();
        cy.get('h2').eq(1);
        cy.contains('Madrid');
    });

    it('can select topic', () => {
        cy.get('.madrid-card').click();
        cy.get('.topic-card').eq(1).click();
        cy.get('.Mui-selected')
        cy.contains('Classes');
    });

    it('can select class and view details', () => {
        cy.get('.madrid-card').click();
        cy.get('.topic-card').eq(1).click();
        cy.get('.MuiCard-root').eq(1).click();
        cy.contains('Go to website');
    });

    it('can select select other classes from provider' , () => {
        cy.get('.madrid-card').click();
        cy.get('.MuiCard-root').eq(1).click();
        cy.get('.other-classes').click();
        cy.get('.MuiTableCell-root').eq(1).click();
        cy.contains('Go to website');
    });

    it('can view online classes in Spanish', () => {
        cy.get('.language-selector-btn').eq(0).click();
        cy.get('.types').get('h2');
        cy.contains('Aprende en línea');
    });

    it('can select topic from class card, in Spanish', () => {
        let topic = ''
        cy.get('.language-selector-btn').eq(0).click();
        cy.get('.madrid-card').click();
        cy.get('.MuiCard-root').eq(1).click();
        cy.get('.tag').eq(1).then(elem => { topic = elem.val(); })
        cy.get('.tag').eq(1).click();
        // cy.get('h2').eq(1);
        // cy.contains('Madrid');
        // cy.get('.result-filters').contains(topic);
    });
})