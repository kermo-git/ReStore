import { useEffect } from "react"

import { productSelectors, fetchProductsAsync, fetchFilters } from "../../Features/Catalog/CatalogSlice"
import { useAppSelector, useAppDispatch } from "../Store/ConfigureStore"

export function useProducts() {
	const products = useAppSelector(productSelectors.selectAll)
	const {productsLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog)
	const dispatch = useAppDispatch()

    useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch])

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])

	return {
		products,
		productsLoaded, 
		filtersLoaded, 
		brands, types, 
		productParams, 
		metaData
	}
}