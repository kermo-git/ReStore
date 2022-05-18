import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Agent from "../../App/API/Agent";
import { Basket } from "../../App/Models/Basket";

interface BasketState {
	basket: Basket | null,
	status: string
}

const initialState: BasketState = {
	basket: null,
	status: "idle"
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity: number}>(
	"basket/addBasketItemAsync",
	async ({productId, quantity}) => {
		try {
			return await Agent.Basket.addItem(productId, quantity)
		} catch (error) {
			console.log(error);
		}
	}
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
	"basket/removeBasketItemAsync",
	async ({productId, quantity}) => {
		try {
			await Agent.Basket.removeItem(productId, quantity)
		} catch (error) {
			console.log(error);
		}
	}
)

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	
	reducers: {
		setBasket: (state, action) => {
			state.basket = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addBasketItemAsync.pending, (state, action) => {
			state.status = "pendingAddItem" + action.meta.arg.productId
		})
		builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
			state.basket = action.payload
			state.status = "idle"
		})
		builder.addCase(addBasketItemAsync.rejected, (state) => {
			state.status = "idle"
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
	}
})

export const {setBasket} = basketSlice.actions