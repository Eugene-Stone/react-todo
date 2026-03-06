import TodoField from '../TodoField/TodoField';

export default function TodoSearchForm({ children }) {
	return (
		<form className="todo__form">
			<TodoField id="search-task" title="Search task" type="search" />
		</form>
	);
}
