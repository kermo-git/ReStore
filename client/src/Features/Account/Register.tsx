import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Alert, AlertTitle, List, ListItem, Paper } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoadingButton } from '@mui/lab'

import Agent from '../../App/API/Agent'

export default function Register() {
	const navigate = useNavigate()
	const {register, setError, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({mode: "all"})

	function submit(data: FieldValues) {
		Agent.Account.register(data)
		.then(() => {
			navigate("/login")
			toast.success("Registration.successful - you can now login")
		})
		.catch(errors => {
			errors.forEach((error: string) => {
				if (error.includes("Username")) {
					setError("username", {message: error})
				} else if (error.includes("Email")) {
					setError("email", {message: error})
				} else if (error.includes("Password")) {
					setError("password", {message: error})
				}
			})
		})
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
				Register
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
					label="Email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
							message: "This is not a valid email"
						}
					})}	
					error={!!errors?.email}
					helperText={errors?.email?.message}

					margin="normal"
					fullWidth		
				/>				
				<TextField		
					type="password"					
					label="Password"				
					{...register("password", {
						required: "Password is required",
						pattern: {
							value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
							message: "The password is not complex enough"
						}
					})}						
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
					Register
				</LoadingButton>
				<Grid container>
					<Grid item>
						<Link to="/login">
							{"Already have an account? Log in"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}