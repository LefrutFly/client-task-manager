import { FC } from 'react'
import style from './TimeTaskCard.module.scss'

interface ITimeTaskCardProps {
	time: string
	variant: 'active' | 'inactive'
}

const TimeTaskCard: FC<ITimeTaskCardProps> = ({ time, variant }) => {
	const t = time.split(':')
	const hour = t[0]
	const minute = t[1]

	return (
		<div className={variant === 'active' ? style.active : style.inactive}>
			<span>Done by </span>
			{hour}
			<span>:</span>
			{minute}
		</div>
	)
}

export default TimeTaskCard
