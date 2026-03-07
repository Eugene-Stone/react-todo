import { createContext } from 'react';
import useTasks from '../../hooks/useTasks';

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
			}}>
			{children}
		</TodosContext.Provider>
	);
}

export { TodosContext };
