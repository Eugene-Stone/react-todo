import { createContext } from 'react';
import { useTasks } from '../../hooks/useTasks.ts';

interface Todo {
	id: string;
	title: string;
	isComplate: boolean;
}

interface TodosContextType {
	todos: Todo[];
	todosFiltered: Todo[];
	searchValue: string;
	setSearchValue: (value: string) => void;
	addTaskHandler: (value: string) => Promise<void>;
	checkedTaskHandler: (task: Todo) => Promise<void>;
	removeTaskHandler: (task: Todo) => Promise<void>;
	removeAllTasksHandler: () => Promise<void>;
	addRef: React.RefObject<HTMLInputElement | null>;
	isAppearing: string | null;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

type TypeContext = {
	children: React.ReactNode;
};

export default function TodosContextProvider({ children }: TypeContext) {
	const {
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
	} = useTasks();

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
				addRef,
				isAppearing,
			}}>
			{children}
		</TodosContext.Provider>
	);
}

export { TodosContext };
