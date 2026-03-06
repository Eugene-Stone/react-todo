import Button from '../Button/Button';
import TodoField from '../TodoField/TodoField';

export default function TodoAddForm({ children }) {
	return (
		<form className="todo__form">
			<TodoField id="new-task" title="New task" />
			<Button type="submit">Add</Button>
		</form>
	);
}
