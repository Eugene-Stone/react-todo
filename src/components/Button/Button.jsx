import React from 'react';

export default function Button(props) {
	const { children = 'Button', className = '', type = 'button', btnLink } = props;

	return btnLink ? (
		<a className={`button ${className}`}>{children}</a>
	) : (
		<button className={`button ${className}`} type={type}>
			{children}
		</button>
	);
}
