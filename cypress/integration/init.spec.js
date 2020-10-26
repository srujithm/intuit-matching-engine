describe("Should be able to upload files and generate report", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.get('[name="upload-1"]').attachFile({filePath:"alight.csv" }, { subjectType: 'drag-n-drop' })
        cy.get('[name="upload-2"]').attachFile({filePath:"Workday.csv" }, { subjectType: 'drag-n-drop' });
        cy.get('[name="merge-button').click();
    });

    it("upload and generate report", () => {
        cy.get('[name="field-map-confirm"]').click();
    });

    it("generate data and export as csv", () => {
        cy.get('[name="field-map-confirm"]').click();
        cy.get('[name="export-button').click();
        cy.get('[name="Employee_Id"]').click();
        cy.get('[name="start-export').click();
    });

    it("generate data and send report as email", () => {
        cy.get('[name="field-map-confirm"]').click();
        cy.get('[name="email-button"]').click();
        cy.get('[name="email-recepients"]')
            .invoke("val", "test1@example.com")
            .trigger("change");
        cy.get('[name="send-email"]').click({force: true});
    });

    it("generate data and highlight issues", () => {
        cy.get('[name="field-map-confirm"]').click();
        cy.get('.issue-button').first().click();
        cy.get('[name="issue-header"]').should('have.text', 'View/Fix Issues');
    });

    it("generate report and fix issues", () => {
        cy.get('[name="field-map-confirm"]').click();
        cy.get('.issue-button').first().click();
        cy.get('[name="issue-fix-alight"]').first().click();
        cy.get('[name="issue-fix-alight"]').its('length').should('be.lt', 6);
    });

    it("update field  map  before merge", () => {
        cy.get('[value="EE_ID"]')
            .invoke("val", "UUID")
            .trigger('change')
            .should("have.value", "UUID")
    })
});

describe("should be able to update field map settings", () => {
    it("update fieldmap", () => {
        cy.visit("http://localhost:3000/map-fields");
        cy.get('[value="EE_ID"]')
            .invoke("val", "UUID")
            .trigger('change')
            .should("have.value", "UUID")
    });
});