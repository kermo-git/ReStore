import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"

import Agent from "../../App/API/Agent"
import { Basket } from "../../App/Models/Basket"
import { getCookie } from "../../App/Utils"

interface BasketState {
	basket: Basket | null,
	status: string
}

const initialState: BasketState = {
	basket: null,
	status: "idle"
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
	"basket/fetchBasketAsync",
	async (_, thunkAPI) => {
		try {
			return await Agent.Basket.get()
		} catch (error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}, {
		condition: () => !!getCookie("buyerId")
	}
)

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity: number}>(
	"basket/addBasketItemAsync",
	async ({productId, quantity}, thunkAPI) => {
		try {
			return await Agent.Basket.addItem(productId, quantity)
		} catch (error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
	"basket/removeBasketItemAsync",
	async ({productId, quantity}, thunkAPI) => {
		try {
			await Agent.Basket.removeItem(productId, quantity)
		} catch (error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	
	reducers: {
		setBasket: (state, action) => {
			state.basket = action.payload
		},
		clearBasket: (state) => {
			state.basket = null
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addBasketItemAsync.pending, (state, action) => {
			state.status = "pendingAddItem" + action.meta.arg.productId
		})
		builder.addCase(removeBasketItemAsync.pending, (state, action) => {
			state.status = "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name
		})
		builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
			const {productId, quantity} = action.meta.arg
			const index = state.basket?.items.findIndex(item => item.productId === productId)

			if (index === -1 || index === undefined) return

			const items = state.basket!.items
			items[index].quantity -= quantity

			if (items[index].quantity === 0)
				items.splice(index, 1)
				
			state.status = "idle"
		})
		builder.addCase(removeBasketItemAsync.rejected, (state) => {
			state.status = "idle"
		})
		builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
			state.basket = action.payload
			state.status = "idle"
		})
		builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
			state.status = "idle"
			console.log(action.payload)
		})
	}
})

export const {setBasket, clearBasket} = basketSlice.actions