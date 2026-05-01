import { useState, useMemo, useRef, useEffect } from 'react';
import { request } from '../api/request';

interface Todo {
	id: string;
	title: string;
	isComplate: boolean;
}

export function useTasks() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [searchValue, setSearchValue] = useState<string>('');

	const [loading, setLoading] = useState<boolean>(true);
	const [errorData, setErrorData] = useState<string | null>(null);
	const [isAppearing, setIsAppearing] = useState<string | null>(null);

	const addRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await request('/todos', {
					method: 'GET',
				});
				setTodos(data);
			} catch (error) {
				setErrorData(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	async function addTaskHandler(value: string): Promise<void> {
		const newTaskId = self.crypto?.randomUUID() ?? Date.now().toString();

		try {
			const taskNew = await request('/todos', {
				method: 'POST',
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
			setErrorData(error instanceof Error ? error.message : 'Unknown error');
		}
	}

	async function checkedTaskHandler(task: Todo): Promise<void> {
		try {
			const taskUpdated = await request(`/todos/${task.id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					isComplate: !task.isComplate,
				}),
			});

			setTodos((prev) => prev.map((t) => (t.id === taskUpdated.id ? taskUpdated : t)));
		} catch (error) {
			setErrorData(error instanceof Error ? error.message : 'Unknown error');
		}
	}

	async function removeTaskHandler(task: Todo): Promise<void> {
		try {
			const taskRemoved = await request(`/todos/${task.id}`, {
				method: 'DELETE',
			});

			setTodos((prev) => prev.filter((t) => t.id !== taskRemoved.id));
		} catch (error) {
			setErrorData(error instanceof Error ? error.message : 'Unknown error');
		}
	}

	async function removeAllTasksHandler(): Promise<void> {
		try {
			await Promise.all(
				todos.map((task) =>
					request(`/todos/${task.id}`, {
						method: 'DELETE',
					}),
				),
			);

			setTodos([]);
		} catch (error) {
			setErrorData(error instanceof Error ? error.message : 'Unknown error');
		}
	}

	useEffect(() => {
		if (addRef.current) {
			addRef.current.focus();
		}
	}, []);

	const todosFiltered = useMemo(
		() =>
			todos.filter((todoItem) =>
				todoItem.title.toLowerCase().includes(searchValue.toLowerCase()),
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
