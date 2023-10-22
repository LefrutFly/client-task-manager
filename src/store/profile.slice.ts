import { createSlice } from '@reduxjs/toolkit'
import { LocalStorageService } from '../services/localStorage/LocalStorageService.service'
import { IProfile } from '../types/profile.interface'

const initialState: IProfile = {
	userName: '',
}

const profileSlice = createSlice({
	name: 'profile',
	initialState: LocalStorageService.loadProfile() || initialState,
	reducers: {
		setProfile(state, action) {
			state.userName = action.payload.userName

			LocalStorageService.saveProfile(action.payload)
		},
	},
})

export default profileSlice.reducer
export const { setProfile } = profileSlice.actions
