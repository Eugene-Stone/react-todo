import Button from '../Button/Button';
import TodoField from '../TodoField/TodoField';

import { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext/TodosContext';

export default function TodoAddForm() {
	const [value, setValue] = useState('');
	const { addTaskHandler } = useContext(TodosContext);

	// console.log(value);

	return (
		<form
			className="todo__form"
			onSubmit={(e) => {
				e.preventDefault();
				value !== '' ? addTaskHandler(value) : alert('Заполните поле');
				setValue('');
			}}>
			<TodoField
				id="new-task"
				title="New task"
				value={value}
				setValue={setValue}
				addTaskHandler={addTaskHandler}
			/>

			<Button type="submit">Add</Button>
		</form>
	);
}
