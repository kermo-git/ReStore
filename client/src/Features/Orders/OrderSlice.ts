import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Agent from "../../App/API/Agent";
import { Order } from "../../App/Models/Order";

interface OrderState {
	orders: Order[] | null
	status: string
}

const initialState: OrderState = {
	orders: null,
	status: "idle"
}

export const fetchOrdersAsync = createAsyncThunk<Order[]>(
	"order/fetchOrdersAsync",
	async (_, thunkAPI) => {
		try {
			return await Agent.Orders.list()
		} catch (error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const orderSlice = createSlice({
	name: "order",
	initialState,
	
	reducers: {
		clearOrders: (state) => {
			state.orders = null
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOrdersAsync.pending, (state) => {
			state.status = "pending"
		})
		builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
			state.orders = action.payload
			state.status = "idle"
		})
		builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
			state.status = "idle"
			console.log(action.payload);
		})
	}
})

export const {clearOrders} = orderSlice.actions