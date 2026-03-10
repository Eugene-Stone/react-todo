import { useState, useMemo, useRef, useEffect } from "react";
import { request } from "../api/request";

export function useTasks() {
	const [todos, setTodos] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const [loading, setLoading] = useState(true);
	const [errorData, setErrorData] = useState(null);
	const [isAppearing, setIsAppearing] = useState(null);


	const addRef = useRef(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await request("/todos", {
					metod: "GET",
				});
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
			const taskNew = await request("/todos", {
				method: "POST",
				body: JSON.stringify({
					id: newTaskId,
					title: value,
					isComplate: false,
				}),
			});

			setIsAppearing(taskNew.id);

			setTodos((prev) => [...prev, taskNew]);

			setTimeout(() => {
				setIsAppearing(null);
			}, 400);
		} catch (error) {
			setErrorData(error.message);
		}
	}

	async function checkedTaskHandler(task) {
		try {
			const taskUpdated = await request(`/todos/${task.id}`, {
				method: "PATCH",
				body: JSON.stringify({
					isComplate: !task.isComplate,
				}),
			});

			setTodos((prev) =>
				prev.map((t) => (t.id === taskUpdated.id ? taskUpdated : t)),
			);
		} catch (error) {
			setErrorData(error.message);
		}
	}

	async function removeTaskHandler(task) {
		try {
			const taskRemoved = await request(`/todos/${task.id}`, {
				method: "DELETE",
			});

			setTodos((prev) => prev.filter((t) => t.id !== taskRemoved.id));
		} catch (error) {
			setErrorData(error.message);
		}
	}

	async function removeAllTasksHandler() {
		try {
			await Promise.all(
				todos.map((task) =>
					request(`/todos/${task.id}`, {
						method: "DELETE",
					}),
				),
			);

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
		isAppearing,
	};
}
