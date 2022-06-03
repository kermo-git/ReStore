import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { FieldValues } from "react-hook-form"
import Agent from "../../App/API/Agent"

import { User } from "../../App/Models/User"

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
			const user = await Agent.Account.login(data)
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
		try {
			const user = await Agent.Account.currentUser()
			localStorage.setItem("user", JSON.stringify(user))
			return user
		} catch (error: any) {
			return thunkAPI.rejectWithValue({error: error.data})
		}
	}
)

export const accountSlice = createSlice({
	name: "acount",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(isAnyOf(logInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
			state.user = action.payload
		})
		builder.addMatcher(isAnyOf(logInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
			console.log(action.payload);
		})
	}
})