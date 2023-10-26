import { FC } from 'react'
import style from './TimeTaskCard.module.scss'

interface ITimeTaskCardProps {
	time: string
}

const TimeTaskCard: FC<ITimeTaskCardProps> = ({ time }) => {
	const t = time.split(':')
	const hour = t[0]
	const minute = t[1]

	return (
		<div className={style.body}>
			{hour}
			<span>:</span>
			{minute}
		</div>
	)
}

export default TimeTaskCard
