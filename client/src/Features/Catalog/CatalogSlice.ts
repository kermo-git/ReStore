import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import Agent from "../../App/API/Agent"
import { MetaData } from "../../App/Models/Pagination"
import { Product, ProductParams } from "../../App/Models/Product"
import { RootState } from "../../App/Store/ConfigureStore"

interface CatalogState {
	productsLoaded: boolean
	filtersLoaded: boolean
	brands: string[]
	types: string[]
	status: string
	productParams: ProductParams
	metaData?: MetaData
}

const productsAdapter = createEntityAdapter<Product>()

function getURLSearchParams(productParams: ProductParams, metaData?: MetaData) {
	const urlParams = new URLSearchParams()
	urlParams.append("orderBy", productParams.orderBy)

	if (metaData) {
		urlParams.append("pageNumber", metaData.currentPage.toString())
		urlParams.append("pageSize", metaData.pageSize.toString())
	}
	if (productParams.searchTerm)
		urlParams.append("searchTerm", productParams.searchTerm)		
	if (productParams.brands.length > 0)
		urlParams.append("brands", productParams.brands.toString())
	if (productParams.types.length > 0)
		urlParams.append("types", productParams.types.toString())		

	return urlParams
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
	"catalog/fetchProductsAsync",
	async (_, thunkAPI) => {
		try {
			const catalogState = thunkAPI.getState().catalog
			const params = getURLSearchParams(catalogState.productParams, catalogState.metaData)
			const response = await Agent.Catalog.list(params)
			thunkAPI.dispatch(setMetaData(response.metaData))
			return response.items
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

function initProductParams() {
	return {
		orderBy: "name",
		pageNumber: 1,
		pageSize: 6,
		brands: [],
		types: []	
	}
}

export const catalogSlice = createSlice({
	name: "catalog",
	initialState: productsAdapter.getInitialState<CatalogState>({
		productsLoaded: false,
		filtersLoaded: false,
		brands: [],
		types: [],
		status: "idle",
		productParams: initProductParams()
	}),
	reducers: {
		setMetaData: function(state, action) {
			state.productsLoaded = false
			state.metaData = action.payload
		},
		setProductParams: function(state, action) {
			state.productsLoaded = false
			state.productParams = {...state.productParams, ...action.payload}
			if (state.metaData) {
				state.metaData.currentPage = 1
			}
		},
		resetProductParams: function(state) {
			state.productParams = initProductParams()
		}
	},
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
export const {setMetaData, setProductParams, resetProductParams} = catalogSlice.actions