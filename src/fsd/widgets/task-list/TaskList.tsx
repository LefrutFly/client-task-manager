import { FC } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { pathToCreateNewTask } from '../../../config/const-config'
import { ITaskDB } from '../../../types/task.interface'
import TaskCard from '../../entities/task-card/TaskCard'
import Button_1 from '../../shared/buttons/button_1/Button_1'
import style from './TaskList.module.scss'

interface ITasksListProps {
	tasks: ITaskDB[]
	isEmpty: boolean
}

const TaskList: FC<ITasksListProps> = ({ tasks, isEmpty }) => {
	const navigate = useNavigate()

	const goToCreateTask = () => navigate(pathToCreateNewTask)

	return (
		<section className={style.body}>
			<Button_1 variant='green' onClick={goToCreateTask}>
				<div className={style.button}>
					<AiOutlinePlusCircle className={style.plus} />
					<span>Add new task!</span>
				</div>
			</Button_1>
			{isEmpty === false &&
				tasks.length &&
				tasks.map(task => (
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
				))}
		</section>
	)
}

export default TaskList
