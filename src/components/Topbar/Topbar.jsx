import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	AppBar,
	Box,
	IconButton,
	Stack,
	Toolbar,
	Tooltip,
} from '@mui/material';
import { setTheme, clearForm } from '../../redux/slices/appSlice';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EditIcon from '@mui/icons-material/Edit';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '../Switch';
import './topbar.scss';

const Topbar = () => {
	const { theme } = useSelector((state) => state.app);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentLocation = location.pathname;

	const handleEdit = () => {
		navigate('/');
	};

	const handleClear = () => {
		if (location.pathname === '/config-result') {
			navigate('/');
		}
		dispatch(clearForm());
	};

	const handleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		dispatch(setTheme(newTheme));
	};

	return (
		<nav id='topbar' className={theme === 'dark' ? theme : ''}>
			<div className='btn-row'>
				<div className='btn-row'>
					{currentLocation === '/config-result' && (
						<Tooltip title='Edit'>
							<IconButton onClick={handleEdit}>
								<EditIcon htmlColor='steelblue' />
							</IconButton>
						</Tooltip>
					)}
					<Tooltip
						title={currentLocation === '/config-result' ? 'Restart' : 'Clear'}
					>
						<IconButton onClick={handleClear}>
							<RestartAltIcon htmlColor='red' />
						</IconButton>
					</Tooltip>
					<Stack direction='row' alignItems='center'>
						<LightModeIcon />
						<Switch
							checked={theme === 'light' ? false : true}
							onChange={handleTheme}
						/>
						<DarkModeIcon />
					</Stack>
				</div>
			</div>
		</nav>
	);
};

export default Topbar;
