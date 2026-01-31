import React from 'react';
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
	return (
		<FormControl style={style} fullWidth={fullWidth} size='small'>
			<select
				id={label?.toLowerCase()}
				className='select'
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
