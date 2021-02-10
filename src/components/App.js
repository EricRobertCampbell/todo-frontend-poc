import React, { useState, useEffect } from "react";
import { Form, Text, Checkbox } from "informed";
import { useLazyQuery, useMutation } from "@apollo/client";

import { ALL_TODOS, GET_TODOS, CREATE_TODO } from "../queries";

const Todo = ({ data }) => {
	const [editing, setEditing] = useState(false);
	return (
		<>
			<Form>
				<Checkbox field={"checkbox_" + data.id} />
				{data.task}
			</Form>
		</>
	);
};

function App() {
	const [allTodos, setAllTodos] = useState([]);
	const [getAllTodos, getAllTodosStatus] = useLazyQuery(ALL_TODOS, {
		onCompleted: (data) => {
			console.log({ data });
			setAllTodos([...data.allTodos]);
		},
	});
	const [createTodo, createTodoStatus] = useMutation(CREATE_TODO, {
		onCompleted: (data) => {
			console.log("Added new todo", data);
			setAllTodos((allTodos) => [
				...allTodos,
				{
					id: data.createTodo.todo.id,
					task: data.createTodo.todo.task,
					complete: data.createTodo.todo.complete,
				},
			]);
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
	return (
		<>
			<h1>Todos</h1>
			{allTodos.length > 0
				? allTodos.map((todo) => <Todo data={todo} />)
				: null}

			<h2>Add Todo</h2>
			<Form
				onSubmit={(values) => {
					const task = values.newTodo;
					createTodo({
						variables: {
							task,
						},
					});
				}}
			>
				New Todo: <Text field="newTodo" />
				<br />
				<button type="submit">Submit</button>
			</Form>
			{createTodoStatus.error ? (
				<>
					<p>Error creating new todo!</p>
					<pre>{createTodoStatus.error}</pre>
				</>
			) : null}
		</>
	);
}

export default App;
