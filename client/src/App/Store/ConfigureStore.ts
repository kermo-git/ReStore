import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { basketSlice } from "../../Features/Basket/BasketSlice"
import { catalogSlice } from "../../Features/Catalog/CatalogSlice"
import { counterSlice } from "../../Features/Contact/CounterSlice"
import { accountSlice } from "../../Features/Account/AccountSlice"
import { orderSlice } from "../../Features/Orders/OrderSlice"

export const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		basket: basketSlice.reducer,
		catalog: catalogSlice.reducer,
		account: accountSlice.reducer,
		order: orderSlice.reducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
