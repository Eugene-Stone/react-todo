import { createContext } from 'react';
import { useTasks } from '../../hooks/useTasks.js';

const TodosContext = createContext();

export default function TodosContextProvider({ children }) {
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
