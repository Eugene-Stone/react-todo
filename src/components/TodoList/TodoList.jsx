import { useContext, useMemo } from 'react';
import { TodosContext } from '../../context/TodosContext/TodosContext';
import TodoItem from '../TodoItem/TodoItem';
import TodoInfo from '../TodoInfo/TodoInfo';

export default function TodoList() {
	const { todos, todosFiltered } = useContext(TodosContext);

	// const todosList = todosFiltered.map((todoItem) => {
	// 	return (
	// 		<TodoItem
	// 			key={todoItem.id}
	// 			id={todoItem.id}
	// 			title={todoItem.title}
	// 			isComplate={todoItem.isComplate}
	// 		/>
	// 	);
	// });

	const todosList = useMemo(() => {
		return todosFiltered.map((todoItem) => {
			return (
				<TodoItem
					key={todoItem.id}
					task={todoItem}
					id={todoItem.id}
					title={todoItem.title}
					isComplate={todoItem.isComplate}
				/>
			);
		});
	}, [todosFiltered]);

	return (
		<>
			{todosFiltered.length !== 0 ? (
				<>
					<TodoInfo />
					<ul className="todo__list">{todosList}</ul>
				</>
			) : todosFiltered.length === 0 && todos.length !== 0 ? (
				<div className="todo__empty-message">Not found task</div>
			) : (
				<div className="todo__empty-message">Tasks list empty</div>
			)}
		</>
	);
}
