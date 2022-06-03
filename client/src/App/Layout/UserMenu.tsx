import { useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fade } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../Store/ConfigureStore';
import { logout } from '../../Features/Account/AccountSlice';

export default function UserMenu() {
	const {user} = useAppSelector(state => state.account)
	const dispatch = useAppDispatch()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	function openMenuClick(event: any) {
		setAnchorEl(event.currentTarget);
	};
	function closeMenu() {
		setAnchorEl(null);
	};

	return (<>
		<Button 
			onClick={openMenuClick}
			color="inherit"
			sx={{typography: "h6"}}
		>
			{user?.email}
		</Button>
		<Menu
			anchorEl={anchorEl}
			open={!!anchorEl}
			onClose={closeMenu}
			TransitionComponent={Fade}
		>
			<MenuItem onClick={closeMenu}>Profile</MenuItem>
			<MenuItem onClick={closeMenu}>My account</MenuItem>
			<MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
		</Menu>
	</>);
}
