import { debounce, TextField } from "@mui/material"
import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore"
import { setProductParams } from "./CatalogSlice"

export default function ProductSearch() {
	const {productParams} = useAppSelector(state => state.catalog)
	const dispatch = useAppDispatch()

	const [searchTerm, setSearchTerm] = useState(productParams.searchTerm)
	
	const debouncedSearch = debounce(event => {
		dispatch(setProductParams({
			searchTerm: event.target.value
		}))
	}, 1000)

	return (
		<TextField
			label="Search products"
			variant="outlined"
			fullWidth
			value={searchTerm || ""}
			onChange={event => {
				setSearchTerm(event.target.value)
				debouncedSearch(event)
			}}
		/>
	)
}