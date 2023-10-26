import { FC, useState } from 'react'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { TasksService } from '../../../services/tasks/Task.service'
import { ITaskCard, TypeOfTask } from '../../../types/task.interface'
import TimeTaskCard from '../../shared/time-task-card/TimeTaskCard'
import style from './TaskCard.module.scss'

const TypeToStyle = {
	[TypeOfTask.BLUE]: style.blue,
	[TypeOfTask.RED]: style.red,
	[TypeOfTask.GREEN]: style.green,
}

const TaskCard: FC<ITaskCard> = ({
	id,
	title,
	description,
	isCompleted,
	type_of_task,
	timeTo,
}) => {
	const [isActiveTask, setActiveTask] = useState<boolean>(isCompleted)

	const newDescription =
		description.length > 200 ? description.slice(0, 200) + '...' : description

	const enableTask = (enable: boolean) => {
		setActiveTask(enable)
		TasksService.updateCompletedTaskById(id, enable)
	}

	return (
		<div className={style.body}>
			<div className={style.toggleBlock}>
				{isActiveTask ? (
					<MdRadioButtonChecked
						className={`${style.toggle} ${style.toggleActive}`}
						onClick={() => enableTask(false)}
					/>
				) : (
					<MdRadioButtonUnchecked
						className={`${style.toggle} ${style.toggleNotActive}`}
						onClick={() => enableTask(true)}
					/>
				)}
			</div>
			<div className={style.textBlock}>
				<div className={style.time}>
					<TimeTaskCard time={timeTo} />
				</div>
				<p className={`${style.title} ${TypeToStyle[type_of_task]}`}>{title}</p>
				<p className={style.description}>{newDescription}</p>
			</div>
		</div>
	)
}

export default TaskCard
