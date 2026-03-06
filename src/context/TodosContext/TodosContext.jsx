import { useState, createContext } from 'react';
import { todos as todosInitial } from '../../constants/constants.js';

const TodosContext = createContext();

export default function TodosContextProvider({ children }) {
	const [todos, setTodos] = useState(todosInitial);

	return <TodosContext.Provider value={{ todos }}>{children}</TodosContext.Provider>;
}

export { TodosContext };
