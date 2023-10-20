import { FC } from 'react'
import { ITaskCard } from '../../../types/task.interface'
import style from './TaskCard.module.scss'

const TaskCard: FC<ITaskCard> = ({
	title,
	description,
	isCompleted,
	type_of_task,
}) => {
	return (
		<div className={style.body}>
			<div className={style.toggle}></div>
			<h3 className={style.title}>{title}</h3>
			<h6 className={style.description}>{description}</h6>
			<div></div>
		</div>
	)
}

export default TaskCard
