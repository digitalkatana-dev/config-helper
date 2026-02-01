import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl } from '@mui/material';
import './select.scss';

const Select = ({
	style,
	fullWidth,
	label,
	value,
	onChange,
	options,
	error,
}) => {
	const { theme } = useSelector((state) => state.app);

	return (
		<FormControl style={style} fullWidth={fullWidth} size='small'>
			<select
				id={label?.toLowerCase()}
				className={`select ${theme === 'dark' ? theme : ''}`}
				value={value}
				onChange={onChange}
			>
				<option className='label' value=''>
					{label}
				</option>
				{options?.map((option, idx) => (
					<option key={idx} value={option?.value}>
						{option?.label}
					</option>
				))}
			</select>
			{error && <h6 className='error'>{error}</h6>}
		</FormControl>
	);
};

export default Select;
