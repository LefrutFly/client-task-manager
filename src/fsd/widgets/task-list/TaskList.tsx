import { FC, useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { pathToCreateNewTask } from '../../../config/const-config'
import { TasksService } from '../../../services/tasks/Task.service'
import { ITaskDB } from '../../../types/task.interface'
import TaskCard from '../../entities/task-card/TaskCard'
import ArrowButton from '../../shared/buttons/arrow-button/ArrowButton'
import Button_1 from '../../shared/buttons/button_1/Button_1'
import style from './TaskList.module.scss'

interface ITasksListProps {
	tasks: ITaskDB[]
	isEmpty: boolean
}

const TaskList: FC<ITasksListProps> = ({ tasks, isEmpty }) => {
	const navigate = useNavigate()

	const todayDate = new Date().toLocaleDateString('ru-Ru')

	const [currentDisplayDate, setCurrentDisplayDate] =
		useState<string>(todayDate)

	const [currentTasks, setCurrentTasks] = useState<ITaskDB[]>([])

	const showNextDate = () => {
		const parts = currentDisplayDate.split('.')

		if (parts.length !== 3) return

		const day = +parts[0]
		const month = +parts[1] - 1
		const year = +parts[2]

		const date = new Date(year, month, day)
		date.setDate(date.getDate() + 1)
		setCurrentDisplayDate(date.toLocaleDateString('ru-Ru'))
	}
	const showPreviousDate = () => {
		const parts = currentDisplayDate.split('.')

		if (parts.length !== 3) return

		const day = +parts[0]
		const month = +parts[1] - 1
		const year = +parts[2]

		const date = new Date(year, month, day)
		date.setDate(date.getDate() - 1)
		setCurrentDisplayDate(date.toLocaleDateString('ru-Ru'))
	}

	const loadCurrentTasks = async () => {
		const t = await TasksService.getTasksByDate(currentDisplayDate)
		setCurrentTasks(t)
	}

	useEffect(() => {
		loadCurrentTasks()
	}, [currentDisplayDate])

	const goToCreateTask = () => navigate(pathToCreateNewTask)

	return (
		<section className={style.body}>
			<Button_1 variant='green' onClick={goToCreateTask}>
				<div className={style.button}>
					<AiOutlinePlusCircle className={style.plus} />
					<span>Add new task!</span>
				</div>
			</Button_1>
			<div className={style.date}>
				<ArrowButton variant='back' onClick={showPreviousDate} />
				<h3 className={style.title}>{currentDisplayDate}</h3>
				<ArrowButton variant='forward' onClick={showNextDate} />
			</div>
			{isEmpty === false && currentTasks.length > 0 ? (
				currentTasks.map(task => (
					<TaskCard
						key={task.id}
						id={task.id}
						title={task.title}
						description={task.description}
						isCompleted={task.isCompleted}
						type_of_task={task.type_of_task}
						date={task.date}
						timeTo={task.timeTo}
					/>
				))
			) : (
				<h5>You have no entries for this day :(</h5>
			)}
		</section>
	)
}

export default TaskList
