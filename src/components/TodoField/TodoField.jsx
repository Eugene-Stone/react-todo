import { memo } from 'react';

function TodoField(props) {
	const { id, title = 'Field title', type = 'text', value, setValue } = props;

	return (
		<div className="todo__field field">
			<label className="field__label" htmlFor={id}>
				{title}
			</label>
			<input
				className="field__input"
				id={id}
				placeholder=" "
				autoComplete="off"
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
}

export default memo(TodoField);
