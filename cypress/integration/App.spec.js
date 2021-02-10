describe("The App as a whole", () => {
	it("Should be able to be visited", () => {
		cy.visit("/");
		cy.findByText(/todos/i).should("exist");
	});
	it("Should display the two todos that initially exist", () => {
		cy.visit("/");
		cy.findByText(/first task/i).should("exist");
		cy.findByText(/second task/i).should("exist");
	});
	it("Should correctly show the first task as checked and the second one as not", () => {
		cy.visit("/");
		cy.findByText(/first task/i).within(() => {
			cy.findByRole("checkbox").should("be.checked");
		});
		cy.findByText(/second task/i).within(() => {
			cy.findByRole("checkbox").should("not.be.checked");
		});
	});
	it("Should be able to check and uncheck a checkbox", () => {
		cy.visit("/");
		cy.findByText(/second task/i).within(() => {
			cy.findByRole("checkbox").as("check");
			cy.get("@check").should("not.be.checked");
			cy.get("@check").click();
			cy.get("@check").should("be.checked");
			cy.get("@check").click();
			cy.get("@check").should("not.be.checked");
		});
	});
	it("Should be able to add a new todo", () => {
		const newTask = "flibbertigibbet";
		cy.visit("/");
		cy.findByRole("textbox").type(newTask);
		cy.findByRole("button", { name: /submit/i }).click();
		cy.findByRole("textbox").clear().should("have.value", "");
		cy.findByText(newTask).should("exist");
	});
});
