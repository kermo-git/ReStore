import { createSlice } from "@reduxjs/toolkit";

import { Basket } from "../../App/Models/Basket";

interface BasketState {
	basket: Basket | null
}

const initialState: BasketState = {
	basket: null
}

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
	}
})

export const {setBasket, removeItem} = basketSlice.actions