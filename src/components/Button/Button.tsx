import React from 'react';

interface ButtonProps {
	children?: React.ReactNode;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	btnLink?: boolean;
}

export default function Button({
	children = 'Button',
	className = '',
	type = 'button',
	btnLink,
}: ButtonProps) {
	return btnLink ? (
		<a className={`button ${className}`}>{children}</a>
	) : (
		<button className={`button ${className}`} type={type}>
			{children}
		</button>
	);
}
