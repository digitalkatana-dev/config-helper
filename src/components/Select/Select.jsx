import React from 'react';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from '@mui/material';
import './select.scss';

const Select = ({
	id,
	style,
	fullWidth,
	autoWidth,
	label,
	value,
	onChange,
	options,
}) => {
	return (
		<FormControl style={style} fullWidth={fullWidth} size='small'>
			<InputLabel id={label?.toLowerCase()}>{label}</InputLabel>
			<MuiSelect
				className='muiselect'
				labelId={label?.toLowerCase()}
				id={id}
				value={value}
				label={label}
				onChange={onChange}
				autoWidth={autoWidth}
			>
				<MenuItem value=''>
					<em>None</em>
				</MenuItem>
				{options?.map((option, idx) => (
					<MenuItem key={idx} value={option?.value}>
						{option?.label}
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
};

export default Select;
