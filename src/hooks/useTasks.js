import { useState, useMemo, useCallback } from "react";
import { todos as todosInitial } from "../constants/constants.js";

export default function useTasks() {
	const [todos, setTodos] = useState(todosInitial);
	const [searchValue, setSearchValue] = useState("");

	const todosFiltered = useMemo(
		() =>
			todos.filter((todoItem) =>
				todoItem.title
					.toLowerCase()
					.includes(searchValue.toLowerCase()),
			),
		[todos, searchValue],
	);

	const addTaskHandler = useCallback((value) => {
		const newTaskId = Date.now();
		// setTodos([...todos, { id: newTaskId, title: value, isComplate: false }]);
		setTodos((prevTasks) => [
			...prevTasks,
			{ id: newTaskId, title: value, isComplate: false },
		]);
	}, []);

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

	const removeTaskHandler = useCallback(
		(id) => {
			console.log("removeTaskHandler", id);
			setTodos(todos.filter((t) => t.id !== id));
		},
		[todos],
	);

	const removeAllTasksHandler = useCallback(() => {
		console.log("removeAllTasksHandler");
		setTodos([]);
	}, []);

	return {
		todos,
		todosFiltered,
		searchValue,
		setSearchValue,
		addTaskHandler,
		checkedTaskHandler,
		removeTaskHandler,
		removeAllTasksHandler,
	};
}
