import { User } from 'firebase/auth'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
	pathToHome,
	pathToLogin,
	pathToRegister,
} from '../../../config/const-config'
import { useAppDispatch } from '../../../hooks/reduxHook'
import { ProfileService } from '../../../services/profile/Profile.service'
import { UserService } from '../../../services/user/User.service'
import { setUser } from '../../../store/auth.slice'
import { setProfile } from '../../../store/profile.slice'
import { IUserAuth } from '../../../types/user.interface'
import { formattingForDB } from '../../../utils/utils-for-string/deleteEmail'
import { FormField } from '../../entities/form-field/FormField'
import Button_1 from '../../shared/buttons/button_1/Button_1'
import Table_1 from '../../shared/tables/table_1/Table_1'
import style from './Auth.module.scss'
import { validEmail } from './validEmail'

export enum AuthType {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
}

interface IAuthProps {
	type: AuthType
}

const Auth: FC<IAuthProps> = ({ type }) => {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IUserAuth>({
		mode: 'onChange',
	})

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const loginToStore = (user: User) => {
		dispatch(
			setUser({
				email: user.email,
				id: user.uid,
				token: user.accessToken,
			})
		)
		navigate(pathToHome)
	}

	const registerToStore = (user: User) => {
		dispatch(
			setUser({
				email: user.email,
				id: user.uid,
				token: user.accessToken,
			})
		)
		navigate(pathToLogin)
	}

	const login = async (data: IUserAuth) => {
		UserService.login(data, loginToStore)
		const emailKey = formattingForDB(data.email)
		const profileData = await ProfileService.getByEmail(emailKey)
		const name = profileData?.userName + ''
		dispatch(setProfile({ userName: name }))
	}

	const register = (data: IUserAuth) =>
		UserService.register(data, registerToStore)

	const onSubmit: SubmitHandler<IUserAuth> = data => {
		if (type === AuthType.LOGIN) login(data)
		else register(data)

		reset()
	}

	return (
		<Table_1 headerTittle={type}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={style.emailInput}>
					<FormField
						{...formRegister('email', {
							required: 'Email is required',
							pattern: {
								value: validEmail,
								message: 'Please enter a valid email address',
							},
						})}
						placeholder='email'
						error={errors.email?.message}
					/>
				</div>
				<div className={style.passwordInput}>
					<FormField
						{...formRegister('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Min length should more 6 symbols',
							},
						})}
						type='password'
						placeholder='password'
						error={errors.password?.message}
					/>
				</div>
				<div className={style.buttonsBlock}>
					<Button_1 variant='green'>Submit</Button_1>
					<button
						type='button'
						className={style.goToLoginOrRegister}
						onClick={() => {
							type === AuthType.LOGIN
								? navigate(pathToRegister)
								: navigate(pathToLogin)
						}}
					>
						Go to {type === AuthType.LOGIN ? AuthType.REGISTER : AuthType.LOGIN}
						?
					</button>
				</div>
			</form>
		</Table_1>
	)
}

export default Auth
