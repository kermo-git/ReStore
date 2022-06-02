import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import Agent from '../../App/API/Agent';

export default function Login() {
	const {register, handleSubmit, formState: {isSubmitting}} = useForm()

	async function submit(data: FieldValues) {
		await Agent.Account.login(data)
	}

	return (
	<Container component={Paper} maxWidth="sm" sx={{
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		p: 4
	}}>
		<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
			<LockOutlinedIcon/>
		</Avatar>
		<Typography component="h1" variant="h5">
			Sign in
		</Typography>
		<Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
			<TextField
				margin="normal"
				fullWidth				
				label="Username"
				{...register("username")}	
				autoFocus
			/>
			<TextField
				margin="normal"
				fullWidth		
				{...register("password")}		
				label="Password"	
				type="password"								
			/>
			<LoadingButton
				loading={isSubmitting}
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Sign In
			</LoadingButton>
			<Grid container>
				<Grid item>
					<Link to="/register">
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</Box>
	</Container>
	);
}