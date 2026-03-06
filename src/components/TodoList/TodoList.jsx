import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext/TodosContext';
import TodoItem from '../TodoItem/TodoItem';

export default function TodoList() {
	const { todos } = useContext(TodosContext);

	const todosList = todos.map((todoItem) => {
		return (
			<TodoItem id={todoItem.id} title={todoItem.title} isComplate={todoItem.isComplate} />
		);
	});

	console.log(todosList);

	return (
		<>
			{todos.length !== 0 ? (
				<ul className="todo__list">{todosList}</ul>
			) : (
				<div className="todo__empty-message">Tasks list empty</div>
			)}
		</>
	);
}
