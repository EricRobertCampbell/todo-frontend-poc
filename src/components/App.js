import React, { useState, useEffect } from "react";
import { Form, Text } from "informed";
import { useLazyQuery } from "@apollo/client";

import { ALL_TODOS, GET_TODOS } from "../queries";

function App() {
	const allTodos = useState([]);
	const [getAllTodos, getAllTodosStatus] = useLazyQuery(ALL_TODOS, {
		onCompleted: (data) => {
			console.log({ data });
		},
	});

	useEffect(() => {
		getAllTodos();
	}, [getAllTodos]);

	if (getAllTodosStatus.loading) {
		return <p>Loading...</p>;
	}
	if (getAllTodosStatus.error) {
		return (
			<>
				<p>Error!</p>
				<pre>{JSON.stringify(getAllTodosStatus.error, null, 4)}</pre>
			</>
		);
	}
	return <h1>App</h1>;
}

export default App;
