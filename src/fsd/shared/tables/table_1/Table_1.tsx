import { FC, ReactNode } from 'react'
import style from './Table_1.module.scss'

interface ITable_1Props {
	headerTittle: string
	children?: ReactNode
}

const Table_1: FC<ITable_1Props> = ({ headerTittle, children }) => {
	return (
		<section className={style.body}>
			<div className={style.header}>
				<p>{headerTittle}</p>
			</div>
			<div className={style.children}>{children}</div>
		</section>
	)
}

export default Table_1
