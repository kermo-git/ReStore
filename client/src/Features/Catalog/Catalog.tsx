import { Checkbox, FormControlLabel, FormGroup, Grid, Pagination, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"

import Loading from "../../App/Layout/Loading"
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore"
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./CatalogSlice"
import ProductList from "./ProductList"
import ProductSearch from "./ProductSearch"
import RadioButtonGroup from "../../App/components/RadioButtonGroup"

const sortOptions = [
	{value: "name", label: "Alphabetical"},
	{value: "price", label: "Price - low to high"},
	{value: "priceDesc", label: "Price - high to low"}
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
	const {productsLoaded, filtersLoaded, brands, types, status, productParams} = useAppSelector(state => state.catalog)
	const dispatch = useAppDispatch()

    useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch])

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])
    
	if (status.includes("pending")) return <Loading message="Loading products ..."/>

    return (
		<Grid container spacing={4}>
			<Grid item xs={3}>
				<Paper sx={{mb: 2}}>
					<ProductSearch/>
				</Paper>
				<Paper sx={{mb: 2, p: 2}}>
					<RadioButtonGroup 
						options={sortOptions} 
						selectedValue={productParams.orderBy} 
						onChange={(ev) => {
							dispatch(setProductParams({orderBy: ev.target.value}))
						}}						
					/>
				</Paper>
				<Paper sx={{mb: 2, p: 2}}>
					<FormGroup>
						{brands.map(brand => (
							<FormControlLabel control={<Checkbox/>} label={brand} key={brand} />							
						))}
					</FormGroup>					
				</Paper>	
				<Paper sx={{mb: 2, p: 2}}>
					<FormGroup>
						{types.map(type => (
							<FormControlLabel control={<Checkbox/>} label={type} key={type} />							
						))}
					</FormGroup>					
				</Paper>							
			</Grid>
			<Grid item xs={9}>
				<ProductList products={products}/>
			</Grid>
			<Grid item xs={3}/>
			<Grid item xs={9}>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Typography>
						Displaying items 1-6 out of 20
					</Typography>
					<Pagination
						color="secondary"
						size="large"
						count={10}
						page={2}
					/>
				</Box>
			</Grid>
		</Grid>
	)
}