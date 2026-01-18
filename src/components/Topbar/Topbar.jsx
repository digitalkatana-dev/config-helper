import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';

const Topbar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<h5>Hello</h5>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Topbar;
