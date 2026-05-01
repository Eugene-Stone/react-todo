// import TodoInfo from './components/TodoInfo/TodoInfo';
import TodoList from './components/TodoList/TodoList.tsx';
import TodoAddForm from './components/TodoAddForm/TodoAddForm.tsx';
import TodoSearchForm from './components/TodoSearchForm/TodoSearchForm.tsx';
// import { useContext } from 'react';
// import { TodosContext } from './context/TodosContext/TodosContext';

function App() {
	// const { todos } = useContext(TodosContext);
	// console.log(todos);

	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>

			<TodoAddForm />
			<TodoSearchForm />
			<TodoList />
		</div>
	);
}

export default App;
