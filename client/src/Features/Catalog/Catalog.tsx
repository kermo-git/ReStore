import { Grid, Paper } from "@mui/material"

import Loading from "../../App/Layout/Loading"
import { setPageNumber, setProductParams } from "./CatalogSlice"
import ProductList from "./ProductList"
import ProductSearch from "./ProductSearch"
import RadioButtonGroup from "../../App/components/RadioButtonGroup"
import CheckboxGroup from "../../App/components/CheckboxGroup"
import AppPagination from "../../App/components/AppPagination"
import { useProducts } from "../../App/Hooks/UseProducts"
import { useAppDispatch } from "../../App/Store/ConfigureStore"

const sortOptions = [
	{value: "name", label: "Alphabetical"},
	{value: "price", label: "Price - low to high"},
	{value: "priceDesc", label: "Price - high to low"}
]

export default function Catalog() {
	const dispatch = useAppDispatch()
	const {products, brands, types, productParams, metaData} = useProducts()
    
	if (products.length === 0) return <Loading message="Loading products ..."/>

    return (
		<Grid container spacing={4} sx={{mb: 2}}>
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
					<CheckboxGroup
						items={brands}
						checkedItems={productParams.brands || []}
						onChange={(checkedBrands) => {
							dispatch(setProductParams({brands: checkedBrands}))
						}}
					/>					
				</Paper>	
				<Paper sx={{mb: 2, p: 2}}>
					<CheckboxGroup
							items={types}
							checkedItems={productParams.types || []}
							onChange={(checkedTypes) => {
								dispatch(setProductParams({types: checkedTypes}))
							}}
						/>				
					</Paper>							
			</Grid>
			<Grid item xs={9}>
				<Grid container rowSpacing={2}>
					<Grid item xs={12}>
						<ProductList products={products}/>
					</Grid>
					<Grid item xs={12}>
						{ metaData ?
							<AppPagination
								metaData={metaData}
								onPageChange={(page) => {
									dispatch(setPageNumber({pageNumber: page}))
								}}
							/> 
							: null
						}	
					</Grid>					
				</Grid>	
			</Grid>
		</Grid>
	)
}