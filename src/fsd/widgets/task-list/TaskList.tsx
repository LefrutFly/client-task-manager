import { FC } from 'react'
import { ITaskDB } from '../../../types/task.interface'
import TaskCard from '../../entities/task-card/TaskCard'
import style from './TaskList.module.scss'

interface ITasksListProps {
	tasks: ITaskDB[]
}

const TaskList: FC<ITasksListProps> = ({ tasks }) => {
	return (
		<section className={style.body}>
			{tasks.length &&
				tasks.map(task => (
					<TaskCard
						key={task.id}
						title={task.title}
						description={task.description}
						isCompleted={task.isCompleted}
						type_of_task={task.type_of_task}
						date={task.date}
					/>
				))}
		</section>
	)
}

export default TaskList
