import { gql } from "@apollo/client";

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

export { ALL_TODOS, GET_TODO };
