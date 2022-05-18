import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import Agent from "../../App/API/Agent"
import { Product } from "../../App/Models/Product"
import { RootState } from "../../App/Store/ConfigureStore"

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
	"catalog/fetchProductsAsync",
	async () => {
		try {
			return await Agent.Catalog.list()
		} catch(error) {
			console.log(error)
		}
	}
)

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: productsAdapter.getInitialState({
		productsLoaded: false,
		status: "idle"
	}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProductsAsync.pending, (state) => {
			state.status = "pendingFetchProducts"
		})
		builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
			productsAdapter.setAll(state, action.payload)
			state.status = "idle"
			state.productsLoaded = true
		})
		builder.addCase(fetchProductsAsync.rejected, (state) => {
			state.status = "idle"
		})
	}
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)