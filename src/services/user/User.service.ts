import {
	User,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../config/firebase/firebase'
import { IUserAuth } from '../../types/user.interface'
import { ProfileService } from '../profile/Profile.service'
import { TasksService } from '../tasks/Task.service'

export const UserService = {
	async register(
		user: IUserAuth,
		successCallback?: (user: User) => any,
		errorCallback?: (error: string) => any
	) {
		const { email, password } = user

		await createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				ProfileService.create(email)
				TasksService.createEmptyTask(user.uid)
				successCallback && successCallback(user)
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message

				console.log(`${errorCode} :: ${errorMessage}`)

				errorCallback && errorCallback(errorCode)
			})
	},
	async login(
		user: IUserAuth,
		successCallback?: (user: User) => any,
		errorCallback?: (error: string) => any
	) {
		const { email, password } = user

		await signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				successCallback && successCallback(user)
			})
			.catch(error => {
				const errorCode = error.code
				const errorMessage = error.message

				console.log(`${errorCode} :: ${errorMessage}`)

				errorCallback && errorCallback(errorCode)
			})
	},
}
