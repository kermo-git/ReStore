import { Grid, Paper } from "@mui/material"
import { useEffect } from "react"

import Loading from "../../App/Layout/Loading"
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore"
import { fetchFilters, fetchProductsAsync, productSelectors, setMetaData, setProductParams } from "./CatalogSlice"
import ProductList from "./ProductList"
import ProductSearch from "./ProductSearch"
import RadioButtonGroup from "../../App/components/RadioButtonGroup"
import CheckboxGroup from "../../App/components/CheckboxGroup"
import AppPagination from "../../App/components/AppPagination"

const sortOptions = [
	{value: "name", label: "Alphabetical"},
	{value: "price", label: "Price - low to high"},
	{value: "priceDesc", label: "Price - high to low"}
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
	const {productsLoaded, filtersLoaded, brands, types, status, productParams, metaData} = useAppSelector(state => state.catalog)
	const dispatch = useAppDispatch()

    useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch])

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])
    
	if (status.includes("pending") || !metaData) return <Loading message="Loading products ..."/>

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
						<AppPagination
							metaData={metaData}
							onPageChange={(page) => {
								dispatch(setMetaData({...metaData, currentPage: page}))
							}}
						/>	
					</Grid>					
				</Grid>	
			</Grid>
		</Grid>
	)
}