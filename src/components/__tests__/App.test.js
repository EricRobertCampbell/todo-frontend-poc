import React, { useState, useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { MockedProvider } from "@apollo/client/testing";

import App from "../App";

describe("The App component", () => {
	it("Should render", async () => {
		const mocks = [];
		act(() => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<App />
				</MockedProvider>
			);
		});
		expect(await screen.findByText(/todo/i)).toBeInTheDocument();
		expect(screen).toMatchSnapshot();
	});
});
