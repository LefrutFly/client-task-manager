// import { act } from 'react-dom/test-utils'
// import { UserService } from '../../services/tasks/User.service'
// import { IUserAuth } from '../../types/user.interface' // Путь к интерфейсу IUserAuth

// // Mock объект auth
// const createUserWithEmailAndPassword = jest.fn()
// const signInWithEmailAndPassword = jest.fn()

// const auth = {
// 	createUserWithEmailAndPassword,
// 	signInWithEmailAndPassword,
// }

// // Mock getAuth
// jest.spyOn(require('firebase/auth'), 'getAuth').mockReturnValue(auth)

// describe('UserService', () => {
// 	afterEach(() => {
// 		jest.clearAllMocks()
// 	})

// 	it('should register a user', async () => {
// 		const user: IUserAuth = { email: 'test@example.com', password: 'password' }

// 		// Mock успешной регистрации
// 		createUserWithEmailAndPassword.mockResolvedValue({
// 			user: { email: user.email },
// 		})

// 		// Вызываем функцию register
// 		await act(async () => {
// 			await UserService.register(user)
// 		})

// 		// Проверяем, что функция createUserWithEmailAndPassword была вызвана с правильными аргументами
// 		expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
// 			auth,
// 			user.email,
// 			user.password
// 		)

// 		// Вы можете добавить дополнительные проверки, если необходимо
// 	})

// 	it('should log in a user', async () => {
// 		const user: IUserAuth = { email: 'test@example.com', password: 'password' }

// 		// Mock успешного входа
// 		signInWithEmailAndPassword.mockResolvedValue({
// 			user: { email: user.email },
// 		})

// 		// Вызываем функцию login
// 		await act(async () => {
// 			await UserService.login(user)
// 		})

// 		// Проверяем, что функция signInWithEmailAndPassword была вызвана с правильными аргументами
// 		expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
// 			auth,
// 			user.email,
// 			user.password
// 		)

// 		// Вы можете добавить дополнительные проверки, если необходимо
// 	})
// })
