import React from 'react';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup as MuiRadioGroup,
} from '@mui/material';

const RadioGroup = ({ id, row, label, name, value, onChange, options }) => {
	return (
		<FormControl>
			<FormLabel id={id}>{label}</FormLabel>
			<MuiRadioGroup row={row} name={name} value={value} onChange={onChange}>
				{options?.map((option, idx) => (
					<FormControlLabel
						key={idx}
						value={option.value}
						control={<Radio />}
						label={option.label}
					/>
				))}
			</MuiRadioGroup>
		</FormControl>
	);
};

export default RadioGroup;
