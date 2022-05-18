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

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	
	reducers: {
		setBasket: (state, action) => {
			state.basket = action.payload
		},
		removeItem: (state, action) => {
			const {productId, quantity} = action.payload
			const index = state.basket?.items.findIndex(item => item.productId === productId)

			if (index === -1 || index === undefined) return

			const items = state.basket!.items
			items[index].quantity -= quantity

			if (items[index].quantity === 0)
				items.splice(index, 1)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addBasketItemAsync.pending, (state, action) => {
			console.log(action);
			state.status = "pending"
		})
		builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
			state.basket = action.payload
			state.status = "idle"
		})
		builder.addCase(addBasketItemAsync.rejected, (state) => {
			state.status = "idle"
		})
	}
})

export const {setBasket, removeItem} = basketSlice.actions