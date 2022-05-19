import { useEffect } from "react"

import Loading from "../../App/Layout/Loading"
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore"
import { fetchFilters, fetchProductsAsync, productSelectors } from "./CatalogSlice"
import ProductList from "./ProductList"

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll)
	const {productsLoaded, filtersLoaded, status} = useAppSelector(state => state.catalog)
	const dispatch = useAppDispatch()

    useEffect(() => {
		if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch])

	useEffect(() => {
		if (!filtersLoaded) dispatch(fetchFilters())
    }, [filtersLoaded, dispatch])
    
	if (status.includes("pending")) return <Loading message="Loading products ..."/>

    return (<ProductList products={products}/>)
}