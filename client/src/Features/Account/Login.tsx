import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'

import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Paper } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoadingButton } from '@mui/lab'

import { useAppDispatch } from '../../App/Store/ConfigureStore'
import { logInUser } from './AccountSlice'

export default function Login() {
    const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({mode: "all"})

	async function submit(data: FieldValues) {
		try {
			await dispatch(logInUser(data))
			const from = (location.state as any)?.from?.pathname || "/catalog"
			navigate(from, {replace: true})	
		} catch(error) {
			console.log(error)
		}
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
					autoFocus				
					label="Username"
					{...register("username", {required: "Username is required"})}	
					error={!!errors?.username}
					helperText={errors?.username?.message}

					margin="normal"
					fullWidth				
				/>
				<TextField		
					type="password"					
					label="Password"				
					{...register("password", {required: "Password is required"})}						
					error={!!errors?.password}
					helperText={errors?.password?.message}

					margin="normal"
					fullWidth							
				/>
				<LoadingButton
					type="submit"			
					loading={isSubmitting}
					disabled={!isValid}
					
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
	)
}