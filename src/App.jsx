import TodoInfo from './components/TodoInfo/TodoInfo';
import TodoList from './components/TodoList/TodoList';
import TodoAddForm from './components/TodoAddForm/TodoAddForm';
import TodoSearchForm from './components/TodoSearchForm/TodoSearchForm';

function App() {
	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>

			<TodoAddForm />
			<TodoSearchForm />

			<TodoInfo />
			<TodoList />
		</div>
	);
}

export default App;
