import gql from "graphql.tag";

const todoFields = gql`
	fragment TodoFields on TodoType {
		id
		task
		complete
		dateAdded
	}
`;
const allTodos = gql`
	${todoFields}
	query {
		allTodos {
			...TodoFields
		}
	}
`;

const getTodo = gql`
	${todoFields}
	query getTodo($id: ID!) {
		getTodo(id: $id) {
			...TodoFields
		}
	}
`;

export { allTodos, getTodos };
