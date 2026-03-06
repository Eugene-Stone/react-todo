import { useContext, useState } from 'react';
import TodoField from '../TodoField/TodoField';
import { TodosContext } from '../../context/TodosContext/TodosContext';

export default function TodoSearchForm() {
	const { searchValue, setSearchValue } = useContext(TodosContext);

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
			/>
		</form>
	);
}
