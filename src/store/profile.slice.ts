import { createSlice } from '@reduxjs/toolkit'
import { IProfile } from '../types/profile.interface'

const localStorageKey = 'profile'

const initialState: IProfile = {
	userName: '',
}

export const saveProfileToLocalStorage = (profile: IProfile) => {
	localStorage.setItem(localStorageKey, JSON.stringify(profile))
}

export const loadProfileFromLocalStorage = () => {
	const storedProfile = localStorage.getItem(localStorageKey)
	return storedProfile ? JSON.parse(storedProfile) : null
}

const profileSlice = createSlice({
	name: 'profile',
	initialState: loadProfileFromLocalStorage() || initialState,
	reducers: {
		setProfile(state, action) {
			state.userName = action.payload.userName

			saveProfileToLocalStorage(action.payload)
		},
	},
})

export default profileSlice.reducer
export const { setProfile } = profileSlice.actions
