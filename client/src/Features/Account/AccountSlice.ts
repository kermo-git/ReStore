import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { FieldValues } from "react-hook-form"
import { toast } from "react-toastify"

import Agent from "../../App/API/Agent"
import { User } from "../../App/Models/User"
import { history } from "../.."
import { setBasket } from "../Basket/BasketSlice"

interface AccountState {
	user: User | null
}

const initialState: AccountState = {
	user: null
}

export const logInUser = createAsyncThunk<User, FieldValues>(
	"account/logInUser",
	async (data, thunkAPI) => {
		try {
			const {basket, ...user} = await Agent.Account.login(data)
			if (basket) thunkAPI.dispatch(setBasket(basket))
			localStorage.setItem("user", JSON.stringify(user))
			return user
		} catch (error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const fetchCurrentUser = createAsyncThunk<User>(
	"account/fetchCurrentUser",
	async (_, thunkAPI) => {
		const token = localStorage.getItem("user") || ""
		thunkAPI.dispatch(setUser(JSON.parse(token)))
		try {
			const {basket, ...user} = await Agent.Account.currentUser()
			if (basket) thunkAPI.dispatch(setBasket(basket))			
			localStorage.setItem("user", JSON.stringify(user))
			return user
		} catch (error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}, {
		condition: () => !!localStorage.getItem("user")
	}
)

export const accountSlice = createSlice({
	name: "acount",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null
			localStorage.removeItem("user")
			history.push("/")
		},
		setUser: (state, action) => {
			const token = action.payload.token
			const middlePart = token.split(".")[1]
			const claims = JSON.parse(atob(middlePart))
			const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

			state.user = {
				...action.payload, 
				roles: (typeof(roles) === "string") ? [roles] : roles
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(logInUser.rejected, (state, action) => {
			throw action.payload
		})
		builder.addCase(fetchCurrentUser.rejected, (state) => {
			state.user = null
			localStorage.removeItem("user")
			history.push("/")
			toast.error("Session expired, please log in again")
		})
		builder.addMatcher(isAnyOf(logInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
			const token = action.payload.token
			const middlePart = token.split(".")[1]
			const claims = JSON.parse(atob(middlePart))
			const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

			state.user = {
				...action.payload, 
				roles: (typeof(roles) === "string") ? [roles] : roles
			}
		})
	}
})

export const {logout, setUser} = accountSlice.actions