import { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext/TodosContext';

export default function TodoInfo() {
	const { todos, removeAllTasksHandler } = useContext(TodosContext);
	const todosDone = todos.filter((t) => t.isComplate === true).length;

	return (
		<div className="todo__info">
			<div className="todo__total-tasks">
				Done tasks:{' '}
				<span>
					{todosDone}/{todos.length}
				</span>
			</div>
			{todos.length > 0 && (
				<button
					className="todo__delete-all-button"
					type="button"
					onClick={() => {
						confirm('Are you sure?') && removeAllTasksHandler();
					}}>
					Delete all
				</button>
			)}
		</div>
	);
}
