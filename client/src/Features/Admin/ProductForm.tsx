import { useEffect } from "react"
import { useForm } from "react-hook-form"

import { Typography, Grid, Paper, Box, Button } from "@mui/material"

import AppTextInput from "../../App/components/AppTextInput"
import { Product } from "../../App/Models/Product"
import { useProducts } from "../../App/Hooks/UseProducts"
import AppSelectList from "../../App/components/AppSelectList"

interface Props {
	product?: Product
	cancelEdit: () => void
}

export default function ProductForm({product, cancelEdit}: Props) {
	const { control, reset } = useForm()
	const { brands, types } = useProducts()

	useEffect(() => {
		if (product) reset(product)
	}, [product, reset])

	return (
		<Box component={Paper} sx={{p: 4}}>
			<Typography variant="h4" gutterBottom sx={{mb: 4}}>
				Product Details
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<AppTextInput control={control} name='name' label='Product name' />
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppSelectList control={control} name='brand' label='Brand' items={brands}/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppSelectList control={control} name='type' label='Type' items={types}/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name='price' label='Price' type="number"/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<AppTextInput control={control} name='quantityInStock' label='Quantity in Stock'  type="number"/>
				</Grid>
				<Grid item xs={12}>
					<AppTextInput control={control} name='description' label='Description' rows={4}/>
				</Grid>
				<Grid item xs={12}>
					<AppTextInput control={control} name='pictureURL' label='Image' />
				</Grid>
			</Grid>
			<Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
				<Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
				<Button variant='contained' color='success'>Submit</Button>
			</Box>
		</Box>
	)
}