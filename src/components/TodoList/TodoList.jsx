import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext/TodosContext';
import TodoItem from '../TodoItem/TodoItem';
import TodoInfo from '../TodoInfo/TodoInfo';

export default function TodoList() {
	const { todos } = useContext(TodosContext);

	const todosList = todos.map((todoItem) => {
		return (
			<TodoItem
				key={todoItem.id}
				id={todoItem.id}
				title={todoItem.title}
				isComplate={todoItem.isComplate}
			/>
		);
	});

	// console.log(todosList);

	return (
		<>
			{todos.length !== 0 ? (
				<>
					<TodoInfo />
					<ul className="todo__list">{todosList}</ul>
				</>
			) : (
				<div className="todo__empty-message">Tasks list empty</div>
			)}
		</>
	);
}
