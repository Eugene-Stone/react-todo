import Button from '../Button/Button.tsx';
import TodoField from '../TodoField/TodoField.tsx';

import { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext/TodosContext.tsx';
import { useTodosContext } from '../../context/TodosContext/useTodosContext';

export default function TodoAddForm() {
	const [value, setValue] = useState<string>('');
	const [errorValue, setErrorValue] = useState<string>('');
	// const context = useContext(TodosContext);
	// if (!context) throw new Error('TodosContext must be used within TodosContextProvider');
	// const { addTaskHandler, addRef } = context;
	const { addTaskHandler, addRef } = useTodosContext();

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
