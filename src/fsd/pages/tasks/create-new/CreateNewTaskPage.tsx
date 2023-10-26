import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { pathToHome } from '../../../../config/const-config'
import { TasksService } from '../../../../services/tasks/Task.service'
import { ITaskByForm } from '../../../../types/task.interface'
import { FormField } from '../../../entities/form-field/FormField'
import Button_1 from '../../../shared/buttons/button_1/Button_1'
import Table_1 from '../../../shared/tables/table_1/Table_1'
import TaskTypeField from '../../../shared/task-type-field/TaskTypeField'
import style from './CreateNewTaskPage.module.scss'

const CreateNewTaskPage = () => {
	const {
		control,
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ITaskByForm>({
		mode: 'onChange',
	})

	const navigate = useNavigate()

	const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
	const dateRegex = /^(0[1-9]|[12][0-9]|3[01]):(0[1-9]|1[0-2]):\d{4}$/

	const onSubmit = async (data: ITaskByForm) => {
		await TasksService.createTaskByForm(data)
		navigate(pathToHome)
	}

	const cancel = () => {
		reset
		navigate(pathToHome)
	}

	return (
		<Table_1 headerTittle='Create Task'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormField
					{...formRegister('title', {
						required: 'Title is required',
						minLength: {
							value: 3,
							message: 'Min length should more 3 symbols',
						},
					})}
					type='text'
					placeholder='Title'
					error={errors.title?.message}
				/>
				<FormField
					{...formRegister('description', {
						required: 'Description is required',
						minLength: {
							value: 3,
							message: 'Min length should more 3 symbols',
						},
					})}
					type='text'
					placeholder='Description'
					error={errors.description?.message}
				/>
				<TaskTypeField control={control} />
				<FormField
					{...formRegister('timeTo', {
						required: 'Time is required',
						minLength: {
							value: 5,
							message: 'Min length should more 5 symbols',
						},
						pattern: {
							value: timeRegex,
							message: 'Invalid time format (hh:mm)',
						},
					})}
					type='text'
					placeholder='hh:mm'
					error={errors.timeTo?.message}
				/>
				<FormField
					{...formRegister('date', {
						required: 'Date is required',
						minLength: {
							value: 10,
							message: 'Min length should more 10 symbols',
						},
						maxLength: {
							value: 10,
							message: 'Max length should more 10 symbols',
						},
						pattern: {
							value: dateRegex,
							message: 'Invalid time format (dd:mm:yyyy)',
						},
					})}
					type='text'
					placeholder='dd:mm:yyyy'
					error={errors.date?.message}
				/>
				<br />
				<Button_1 variant='green' className={style.button}>
					create new
				</Button_1>
			</form>
			<Button_1 variant='red' className={style.button} onClick={cancel}>
				cancel
			</Button_1>
		</Table_1>
	)
}

export default CreateNewTaskPage
