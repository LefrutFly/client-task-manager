import { FC, ReactNode } from 'react'
import Table_1 from '../../shared/tables/table_1/Table_1'
import style from './ErrorBoard.module.scss'

interface IErrorBoardProps {
	children?: ReactNode
}

export const ErrorBoard: FC<IErrorBoardProps> = ({ children }) => {
	return (
		<Table_1 headerTittle='Error'>
			<p className={style.message}>{children}</p>
		</Table_1>
	)
}
