import { FC, useState } from 'react'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { pathToTaskCard } from '../../../config/const-config'
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
	sortTasks,
}) => {
	const navigate = useNavigate()

	const [isActiveTask, setActiveTask] = useState<boolean>(isCompleted)

	const newDescription =
		description.length > 200 ? description.slice(0, 200) + '...' : description

	const enableTask = async (enable: boolean) => {
		setActiveTask(enable)
		await TasksService.updateCompletedTaskById(id, enable)
		sortTasks()
	}

	const openTask = () => navigate(`${pathToTaskCard}/${id}`)

	return (
		<div className={`${style.body}  ${isActiveTask && style.completed}`}>
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
			<div className={style.textBlock} onClick={openTask}>
				<div className={`${style.time}`}>
					<TimeTaskCard
						time={timeTo}
						variant={isActiveTask ? 'inactive' : 'active'}
					/>
				</div>
				<p
					className={`${style.title} ${
						isActiveTask ? style.completed : TypeToStyle[type_of_task]
					}`}
				>
					{title}
				</p>
				<p className={style.description}>{newDescription}</p>
			</div>
		</div>
	)
}

export default TaskCard
