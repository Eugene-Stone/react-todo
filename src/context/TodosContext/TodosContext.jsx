import { useState, createContext, useCallback, useMemo } from 'react';
import { todos as todosInitial } from '../../constants/constants.js';

const TodosContext = createContext();

export default function TodosContextProvider({ children }) {
	const [todos, setTodos] = useState(todosInitial);
	const [searchValue, setSearchValue] = useState('');

	// const todosFiltered = todos.filter((todoItem) =>
	// 	todoItem.title.toLowerCase().includes(searchValue.toLowerCase()),
	// );

	const todosFiltered = useMemo(
		() =>
			todos.filter((todoItem) =>
				todoItem.title.toLowerCase().includes(searchValue.toLowerCase()),
			),
		[todos, searchValue],
	);

	// function addTaskHandler(value) {
	// 	const newTaskId = Date.now();
	// 	setTodos([...todos, { id: newTaskId, title: value, isComplate: false }]);
	// 	// Или так
	// 	// setTodos(prev => [
	// 	// 	...prev,
	// 	// 	{ id: crypto.randomUUID(), title: value, isComplate: false }
	// 	// ]);
	// 	// console.log('addTaskHandler', value, newTaskId);
	// }
	const addTaskHandler = useCallback((value) => {
		const newTaskId = Date.now();
		// setTodos([...todos, { id: newTaskId, title: value, isComplate: false }]);
		setTodos((prevTasks) => [...prevTasks, { id: newTaskId, title: value, isComplate: false }]);
	}, []);

	// function checkedTaskHandler(id) {
	// 	// console.log('checkedTaskHandler', id);
	// 	setTodos(
	// 		todos.map((t) => {
	// 			if (t.id === id) {
	// 				return { ...t, isComplate: !t.isComplate };
	// 			}
	// 			return t;
	// 		}),
	// 	);
	// }
	const checkedTaskHandler = useCallback(
		(id) => {
			setTodos(
				todos.map((t) => {
					if (t.id === id) {
						return { ...t, isComplate: !t.isComplate };
					}
					return t;
				}),
			);
		},
		[todos],
	);

	// function removeTaskHandler(id) {
	// 	console.log('removeTaskHandler', id);
	// 	setTodos(todos.filter((t) => t.id !== id));
	// }
	const removeTaskHandler = useCallback(
		(id) => {
			console.log('removeTaskHandler', id);
			setTodos(todos.filter((t) => t.id !== id));
		},
		[todos],
	);

	// function removeAllTasksHandler() {
	// 	console.log('removeAllTasksHandler');
	// 	setTodos([]);
	// }
	const removeAllTasksHandler = useCallback(() => {
		console.log('removeAllTasksHandler');
		setTodos([]);
	}, []);

	return (
		<TodosContext.Provider
			value={{
				todos,
				todosFiltered,
				searchValue,
				setSearchValue,
				addTaskHandler,
				checkedTaskHandler,
				removeTaskHandler,
				removeAllTasksHandler,
			}}>
			{children}
		</TodosContext.Provider>
	);
}

export { TodosContext };
