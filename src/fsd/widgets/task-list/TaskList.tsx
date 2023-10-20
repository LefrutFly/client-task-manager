import { TypeOfTask } from '../../../types/task.interface'
import DateTaskList from '../../entities/date-of-task-list/DateTaskList'
import TaskCard from '../../entities/task-card/TaskCard'
import style from './TaskList.module.scss'

const TaskList = () => {
	return (
		<div className={style.body}>
			<DateTaskList date={new Date('2023-10-03')} />
			<TaskCard
				title='First Task'
				description={`It's really my first task!`}
				isCompleted={false}
				type_of_task={TypeOfTask.GREEN}
			/>
		</div>
	)
}

export default TaskList
