import Button from '../Button/Button';
import TodoField from '../TodoField/TodoField';

import { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext/TodosContext';

export default function TodoAddForm() {
	const [value, setValue] = useState('');
	const [errorValue, setErrorValue] = useState('');
	const { addTaskHandler, addRef } = useContext(TodosContext);

	// console.log(value);

	return (
		<form
			className="todo__form"
			onSubmit={(e) => {
				e.preventDefault();
				value !== '' && value.trim().length > 0
					? (addTaskHandler(value), setValue(''))
					: alert('Fill in the field');
			}}>
			<TodoField
				id="new-task"
				title="New task"
				value={value}
				errorValue={errorValue}
				setValue={setValue}
				addTaskHandler={addTaskHandler}
				ref={addRef}
				setErrorValue={setErrorValue}
			/>

			<Button type="submit">Add</Button>
		</form>
	);
}
