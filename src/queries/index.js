import { gql } from "@apollo/client";

// queries
const todoFields = gql`
	fragment TodoFields on TodoType {
		id
		task
		complete
		dateAdded
	}
`;
const ALL_TODOS = gql`
	${todoFields}
	query {
		allTodos {
			...TodoFields
		}
	}
`;

const GET_TODO = gql`
	${todoFields}
	query getTodo($id: ID!) {
		getTodo(id: $id) {
			...TodoFields
		}
	}
`;

// mutations
const CREATE_TODO = gql`
	${todoFields}
	mutation create($task: String) {
		createTodo(task: $task) {
			ok
			todo {
				...TodoFields
			}
		}
	}
`;
export { ALL_TODOS, GET_TODO, CREATE_TODO };
