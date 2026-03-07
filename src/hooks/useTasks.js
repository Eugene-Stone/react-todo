import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { todos as todosInitial } from "../constants/constants.js";

export default function useTasks() {
	const [todos, setTodos] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const [loading, setLoading] = useState(true);
	const [errorData, setErrorData] = useState(null);

	const addRef = useRef(null)

	useEffect(()=> {
		async function fetchData() {
			try {
				const response = await fetch("http://localhost:3001/todos");

				if (!response.ok) throw new Error('Error data server');
					const data = await response.json();

					setTodos(data);

			} catch (error) {
				setErrorData(error)
			} finally {
				setLoading(false)
			}
		}

		fetchData();
	},[])



	async function addTaskHandler(value) {
		const newTaskId = self.crypto?.randomUUID() ?? Date.now();

		try {
			const response = await fetch("http://localhost:3001/todos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: newTaskId,
					title: value,
					isComplate: false,
				}),
			});

			if (!response.ok) throw new Error('Error add task');

			const newTask = await response.json()
			console.log(newTask);
			setTodos((prev) => [...prev, newTask]);

		} catch (error) {
			setErrorData(error.message);
		}
	}

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


	useEffect(()=> {
		addRef.current.focus()
	},[])

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
