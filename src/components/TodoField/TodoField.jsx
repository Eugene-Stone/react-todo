import { memo } from 'react';

function TodoField(props) {
	const {
		id,
		title = 'Field title',
		type = 'text',
		value,
		setValue,
		ref,
		errorValue,
		setErrorValue,
	} = props;

	return (
		<div className="todo__field field">
			<label className="field__label" htmlFor={id}>
				{title}
			</label>
			<input
				className={`field__input ${value !== '' && value.trim().length === 0 ? 'is-invalid' : ''}`}
				ref={ref}
				id={id}
				placeholder=" "
				autoComplete="off"
				type={type}
				value={value}
				onChange={(e) => {
					const val = e.target.value;
					setValue(val);

					if (val === '') {
						setErrorValue('');
					} else if (val.trim().length === 0) {
						setErrorValue('Error input value');
					} else {
						setErrorValue('');
					}

					// setErrorValue(val !== '' && val.trim().length === 0 ? 'Error input value' : '');
				}}
			/>
			{errorValue !== '' && <span className="error">{errorValue}</span>}
		</div>
	);
}

export default memo(TodoField);
