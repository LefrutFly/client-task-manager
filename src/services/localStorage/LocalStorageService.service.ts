import { IUserState } from '../../store/auth.slice'
import { IProfile } from '../../types/profile.interface'

export const LocalStorageService = {
	saveUser(user: IUserState) {
		localStorage.setItem('user', JSON.stringify(user))
	},
	loadUser(): IUserState {
		const storedUser = localStorage.getItem('user')
		return storedUser ? JSON.parse(storedUser) : null
	},
	saveProfile(profile: IProfile) {
		localStorage.setItem('profile', JSON.stringify(profile))
	},
	loadProfile(): IProfile {
		const storedProfile = localStorage.getItem('profile')
		return storedProfile ? JSON.parse(storedProfile) : null
	},
}
