import { get, ref, set } from 'firebase/database'
import { rtdb } from '../../config/firebase/firebase'
import { IProfile } from '../../types/profile.interface'
import deleteEmailPart, {
	formattingForDB,
} from '../../utils/utils-for-string/deleteEmail'

const profileUrl = 'profiles/'

export const ProfileService = {
	async getByEmail(email: string) {
		const key = formattingForDB(email)
		const rtdbRef = ref(rtdb, profileUrl + key)
		try {
			const snapshot = await get(rtdbRef)

			if (snapshot.exists()) {
				const profileData = snapshot.val()
				const profile: IProfile = {
					...profileData,
				}
				return profile
			} else {
				return { userName: ':(' }
			}
		} catch (error) {
			console.error(error)
		}
	},
	async create(email: string) {
		const newProfile: IProfile = {
			userName: deleteEmailPart(email),
		}
		await this.update(email, newProfile)
	},
	async update(email: string, newProfile: IProfile) {
		const key = formattingForDB(email)
		await set(ref(rtdb, `${profileUrl}${key}`), {
			...newProfile,
		}).catch(error => {
			const errorCode = error.code
			const errorMessage = error.message

			console.log(`${errorCode} :: ${errorMessage}`)
		})
	},
}
