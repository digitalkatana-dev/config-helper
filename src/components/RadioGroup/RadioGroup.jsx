import React from 'react';
import { useSelector } from 'react-redux';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup as MuiRadioGroup,
} from '@mui/material';
import './radio.scss';

const RadioGroup = ({ row, label, name, value, onChange, options }) => {
	const { theme } = useSelector((state) => state.app);

	return (
		<FormControl className={`radio-group ${theme === 'dark' ? theme : ''}`}>
			<FormLabel
				className={`radio-group-label ${theme === 'dark' ? theme : ''}`}
			>
				{label}
			</FormLabel>
			<MuiRadioGroup
				className={`radio-btns ${theme === 'dark' ? theme : ''}`}
				row={row}
				name={name}
				value={value}
				onChange={onChange}
			>
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
