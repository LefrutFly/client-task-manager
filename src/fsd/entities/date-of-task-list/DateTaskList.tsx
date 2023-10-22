import { FC } from 'react'
import style from './DateTaskList.module.scss'

interface IDateTaskListProps {
	date: string
}

const DateTaskList: FC<IDateTaskListProps> = ({ date }) => {
	const d = date.split('.')
	return (
		<div className={style.body}>
			{d[0]}
			<span>.</span>
			{d[1]}
			<span>.</span>
			{d[2]}
		</div>
	)
}

export default DateTaskList
