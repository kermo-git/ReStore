import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fade } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../Store/ConfigureStore';
import { logout } from '../../Features/Account/AccountSlice';
import { clearBasket } from '../../Features/Basket/BasketSlice';
import { clearOrders } from '../../Features/Orders/OrderSlice';

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
	function logoutClick() {
		dispatch(logout())
		dispatch(clearBasket())
		dispatch(clearOrders())
	}

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
			<MenuItem component={Link} to="/orders">My orders</MenuItem>
			<MenuItem onClick={logoutClick}>Logout</MenuItem>
		</Menu>
	</>);
}
