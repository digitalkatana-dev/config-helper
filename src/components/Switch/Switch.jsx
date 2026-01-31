import { alpha, styled } from '@mui/material/styles';
import { Switch as BaseSwitch } from '@mui/material';

const Switch = styled(BaseSwitch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#daa520',
		'&:hover': {
			backgroundColor: alpha('#daa520', theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#daa520',
	},
}));

export default Switch;
