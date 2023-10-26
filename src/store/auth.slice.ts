import { createSlice } from '@reduxjs/toolkit'
import { LocalStorageService } from '../services/localStorage/LocalStorageService.service'

export interface IUserState {
	email: string
	token: string | null
	id: string | null
}

const initialState: IUserState = {
	email: '',
	token: null,
	id: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState: LocalStorageService.loadUser() || initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email
			state.token = action.payload.token
			state.id = action.payload.id

			LocalStorageService.saveUser(action.payload)
		},
		clearUser(state) {
			state.email = ''
			state.token = null
			state.id = null

			localStorage.removeItem('user')
			localStorage.removeItem('profile')
		},
	},
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
