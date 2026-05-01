import { useContext, useState } from 'react';
import TodoField from '../TodoField/TodoField.tsx';
import { TodosContext } from '../../context/TodosContext/TodosContext.tsx';

export default function TodoSearchForm() {
	const context = useContext(TodosContext);
	if (!context) throw new Error('TodosContext must be used within TodosContextProvider');
	const { searchValue, setSearchValue } = context;

	console.log(searchValue);

	return (
		<form
			className="todo__form"
			onSubmit={(e) => {
				e.preventDefault();
			}}>
			<TodoField
				id="search-task"
				title="Search task"
				type="search"
				value={searchValue}
				setValue={setSearchValue}
				errorValue=""
				setErrorValue={() => {}}
			/>
		</form>
	);
}
