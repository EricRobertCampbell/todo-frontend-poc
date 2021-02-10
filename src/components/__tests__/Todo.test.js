import React, { useState, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";

import { Todo } from "../App";

describe("The Todo component", () => {
	it("Should render", () => {
		const mocks = [];
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Todo
					data={{ id: "1", task: "Do some things", complete: false }}
				/>
			</MockedProvider>
		);
		expect(screen).toMatchSnapshot();
	});
	it("Should display the task passed in through the data and checkbox (which is checked or not depending on the `complete` attribute)", () => {
		const id = "1";
		const task = "do some things";
		const complete = true;
		const data = {
			id,
			task,
			complete,
		};
		const mocks = [];

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Todo data={data} />
			</MockedProvider>
		);
		expect(screen.getByText(task)).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeChecked();
	});
});
