import { createSlice } from '@reduxjs/toolkit'

export interface IUserState {
	email: string | null
	token: string | null
	id: string | null
}

const initialState: IUserState = {
	email: null,
	token: null,
	id: null,
}

export const saveUserToLocalStorage = (user: IUserState) => {
	localStorage.setItem('user', JSON.stringify(user))
}

export const loadUserFromLocalStorage = () => {
	const storedUser = localStorage.getItem('user')
	return storedUser ? JSON.parse(storedUser) : null
}

const userSlice = createSlice({
	name: 'user',
	initialState: loadUserFromLocalStorage() || initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email
			state.token = action.payload.token
			state.id = action.payload.id

			saveUserToLocalStorage(action.payload)
		},
		clearUser(state) {
			state.email = null
			state.token = null
			state.id = null

			localStorage.removeItem('user')
			localStorage.removeItem('profile')
		},
	},
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
