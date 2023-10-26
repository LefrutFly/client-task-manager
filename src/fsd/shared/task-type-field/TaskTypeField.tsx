import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { ITaskByForm, TypeOfTask } from '../../../types/task.interface'
import style from './TaskTypeField.module.scss'

const TypeToStyle = {
	[TypeOfTask.BLUE]: style.blue,
	[TypeOfTask.RED]: style.red,
	[TypeOfTask.GREEN]: style.green,
}

interface ITaskTypeFieldProps {
	control: Control<ITaskByForm, any>
}

const TaskTypeField: FC<ITaskTypeFieldProps> = ({ control }) => {
	return (
		<div className={style.body}>
			<label className={style.title} htmlFor='type_of_task'>
				Type of Task:
			</label>
			<Controller
				name='type_of_task'
				control={control}
				defaultValue={TypeOfTask.BLUE}
				render={({ field }) => (
					<select
						className={`${style.select} ${TypeToStyle[field.value]}`}
						{...field}
					>
						{Object.values(TypeOfTask).map(type => (
							<option
								className={`${style.option} ${TypeToStyle[type]}`}
								key={type}
								value={type}
							>
								{type}
							</option>
						))}
					</select>
				)}
			/>
		</div>
	)
}

export default TaskTypeField
