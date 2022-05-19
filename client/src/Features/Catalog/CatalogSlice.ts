import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import Agent from "../../App/API/Agent"
import { Product } from "../../App/Models/Product"
import { RootState } from "../../App/Store/ConfigureStore"

const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
	"catalog/fetchProductsAsync",
	async (_, thunkAPI) => {
		try {
			return await Agent.Catalog.list()
		} catch(error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
	"catalog/fetchSingleProductAsync",
	async (productId, thunkAPI) => {
		try {
			return await Agent.Catalog.details(productId)
		} catch(error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const fetchFilters = createAsyncThunk(
	"catalog/fetchFilters",
	async (_, thunkAPI) => {
		try {
			return await Agent.Catalog.filters()
		} catch(error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: productsAdapter.getInitialState({
		productsLoaded: false,
		filtersLoaded: false,
		brands: [],
		types: [],
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
		builder.addCase(fetchSingleProductAsync.pending, (state) => {
			state.status = "pendingFetchSingleProduct"
		})
		builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
			productsAdapter.upsertOne(state, action.payload)
			state.status = "idle"
		})
		builder.addCase(fetchSingleProductAsync.rejected, (state) => {
			state.status = "idle"
		})
		builder.addCase(fetchFilters.pending, (state) => {
			state.status = "pendingFetchFilters"
		})
		builder.addCase(fetchFilters.fulfilled, (state, action) => {
			state.brands = action.payload.brands
			state.types = action.payload.types
			state.filtersLoaded = true
			state.status = "idle"
		})
		builder.addCase(fetchFilters.rejected, (state) => {
			state.status = "idle"
		})
	}
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)