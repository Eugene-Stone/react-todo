import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { todos as todosInitial } from "../constants/constants.js";

export default function useTasks() {
	const [todos, setTodos] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const [loading, setLoading] = useState(true);
	const [errorData, setErrorData] = useState(null);

	const addRef = useRef(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch("http://localhost:3001/todos", {
					headers: {
						"Content-Type": "application/json",
					},
					method: "GET",
				});

				if (!response.ok) throw new Error("Error data server");
				const data = await response.json();

				setTodos(data);
			} catch (error) {
				setErrorData(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	async function addTaskHandler(value) {
		const newTaskId = self.crypto?.randomUUID() ?? Date.now();

		try {
			const response = await fetch("http://localhost:3001/todos", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					id: newTaskId,
					title: value,
					isComplate: false,
				}),
			});

			if (!response.ok) throw new Error("Error add task");

			const taskNew = await response.json();
			console.log(taskNew);
			setTodos((prev) => [...prev, taskNew]);
		} catch (error) {
			setErrorData(error.message);
		}
	}

	async function checkedTaskHandler(task) {
		try {
			const response = await fetch(
				`http://localhost:3001/todos/${task.id}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "PATCH",
					body: JSON.stringify({
						isComplate: !task.isComplate,
					}),
				},
			);

			if (!response.ok) throw new Error("Error update task");

			const taskUpdated = await response.json();
			console.log(taskUpdated);

			setTodos((prev) =>
				prev.map((t) => (t.id === taskUpdated.id ? taskUpdated : t)),
			);
		} catch (error) {
			setErrorData(error.message);
		}
	}

	async function removeTaskHandler(task) {
		try {
			const response = await fetch(
				`http://localhost:3001/todos/${task.id}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "DELETE",
				},
			);

			if (!response.ok) throw new Error("Error delete task");

			setTodos((prev) => prev.filter((t) => t.id !== task.id));
		} catch (error) {
			setErrorData(error.message);
		}
	}

	async function removeAllTasksHandler() {
		try {
			await Promise.all(
				todos.map((task)=> 
					fetch(`http://localhost:3001/todos/${task.id}`, {
						headers: {
							"Content-Type": "application/json",
						},
						method: "DELETE",
					})
				)
			)

			setTodos([]);

		} catch (error) {
			setErrorData(error.message);
		}
	}


	useEffect(() => {
		addRef.current.focus();
	}, []);

	const todosFiltered = useMemo(
		() =>
			todos.filter((todoItem) =>
				todoItem.title
					.toLowerCase()
					.includes(searchValue.toLowerCase()),
			),
		[todos, searchValue],
	);

	return {
		todos,
		todosFiltered,
		searchValue,
		setSearchValue,
		addTaskHandler,
		checkedTaskHandler,
		removeTaskHandler,
		removeAllTasksHandler,
		addRef,
	};
}
