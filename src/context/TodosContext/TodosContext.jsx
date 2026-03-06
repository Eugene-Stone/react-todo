import { useState, createContext } from 'react';
import { todos as todosInitial } from '../../constants/constants.js';

const TodosContext = createContext();

export default function TodosContextProvider({ children }) {
	const [todos, setTodos] = useState(todosInitial);

	function addTaskHandler(value) {
		const newTaskId = Date.now();
		setTodos([...todos, { id: newTaskId, title: value, isComplate: false }]);
		// Или так
		// setTodos(prev => [
		// 	...prev,
		// 	{ id: crypto.randomUUID(), title: value, isComplate: false }
		// ]);
		// console.log('addTaskHandler', value, newTaskId);
	}

	function checkedTaskHandler(id) {
		// console.log('checkedTaskHandler', id);
		setTodos(
			todos.map((t) => {
				if (t.id === id) {
					return { ...t, isComplate: !t.isComplate };
				}
				return t;
			}),
		);
	}
	function removeTaskHandler(id) {
		console.log('removeTaskHandler', id);
		setTodos(todos.filter((t) => t.id !== id));
	}
	function removeAllTasksHandler() {
		console.log('removeAllTasksHandler');
		setTodos([]);
	}

	return (
		<TodosContext.Provider
			value={{
				todos,
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
