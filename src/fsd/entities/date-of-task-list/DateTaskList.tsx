import { FC } from 'react'
import style from './DateTaskList.module.scss'

interface IDateTaskListProps {
	date: Date
}

const DateTaskList: FC<IDateTaskListProps> = ({ date }) => {
	return (
		<div className={style.body}>
			{date.getDate().toString().padStart(2, '0')}
			<span>.</span>
			{(date.getMonth() + 1).toString().padStart(2, '0')}
			<span>.</span>
			{date.getFullYear()}
		</div>
	)
}

export default DateTaskList
