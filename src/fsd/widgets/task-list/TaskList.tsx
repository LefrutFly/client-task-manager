import { FC, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { pathToCreateNewTask } from '../../../config/const-config'
import TaskCard from '../../entities/task-card/TaskCard'
import ArrowButton from '../../shared/buttons/arrow-button/ArrowButton'
import Button_1 from '../../shared/buttons/button_1/Button_1'
import style from './TaskList.module.scss'
import { useDatePage } from './useDatePages'

interface ITasksListProps {
	isEmpty: boolean
}

const TaskList: FC<ITasksListProps> = ({ isEmpty }) => {
	const navigate = useNavigate()

	const { currentDisplayDate, currentTasks, changeDate, loadCurrentTasks } =
		useDatePage()

	useEffect(() => {
		loadCurrentTasks()
	}, [currentDisplayDate, currentTasks])

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
				<ArrowButton variant='back' onClick={() => changeDate(-1)} />
				<h3 className={style.title}>{currentDisplayDate}</h3>
				<ArrowButton variant='forward' onClick={() => changeDate(1)} />
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
						sortTasks={loadCurrentTasks}
					/>
				))
			) : (
				<h5>You have no entries for this day :(</h5>
			)}
		</section>
	)
}

export default TaskList
