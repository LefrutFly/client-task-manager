import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { pathToHome } from '../../../config/const-config'
import { useAppDispatch } from '../../../hooks/reduxHook'
import { useAuth } from '../../../hooks/useAuth'
import { ProfileService } from '../../../services/profile/Profile.service'
import { setProfile } from '../../../store/profile.slice'
import { IProfile } from '../../../types/profile.interface'
import { FormField } from '../../entities/form-field/FormField'
import Button_1 from '../../shared/buttons/button_1/Button_1'
import Table_1 from '../../shared/tables/table_1/Table_1'

const ProfilePage = () => {
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IProfile>({
		mode: 'onChange',
	})

	const navigate = useNavigate()

	const { email } = useAuth()

	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<IProfile> = data => {
		ProfileService.update(email, data)
		dispatch(setProfile(data))
		reset
		navigate(pathToHome)
	}

	return (
		<Table_1 headerTittle='Profile'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormField
					{...formRegister('userName', {
						required: 'Enter your new nickname',
						minLength: {
							value: 3,
							message: 'Min length should more 3 symbols',
						},
						maxLength: {
							value: 12,
							message: 'Max length should less 12 symbols',
						},
					})}
					placeholder='your nick name'
					error={errors.userName?.message}
				/>
				<Button_1 variant='green'>Submit</Button_1>
			</form>
		</Table_1>
	)
}

export default ProfilePage
