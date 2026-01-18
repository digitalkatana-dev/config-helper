import React from 'react';
import { CircularProgress } from '@mui/material';

import './button.scss';

const Button = ({
	loading,
	fullWidth,
	width,
	btnClass,
	type,
	disabled,
	children,
	linkTo,
	ext,
	onClick,
}) => {
	const btnStyle = {
		width: fullWidth ? '100%' : width ? width : 'unset',
	};

	const handleClick = () => {
		if (linkTo && ext) {
			window.open(linkTo, '_blank');
		} else if (linkTo) {
			window.location.href = `${linkTo}`;
		} else if (onClick) {
			onClick();
		}
	};

	return (
		<button
			className={btnClass ? `btn ${btnClass}` : 'btn'}
			style={btnStyle}
			type={type}
			disabled={disabled}
			onClick={handleClick}
		>
			{loading ? (
				<CircularProgress size={15} thickness={6} color='inherit' />
			) : (
				<>{children.toUpperCase()}</>
			)}
		</button>
	);
};

export default Button;
