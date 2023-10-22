import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { pathToLogin } from '../../../config/const-config'
import Table_1 from '../../shared/tables/table_1/Table_1'
import style from './PleaseLoginBoard.module.scss'

interface IPleaseLoginBoardProps {
	children?: ReactNode
}

const PleaseLoginBoard: FC<IPleaseLoginBoardProps> = ({ children }) => {
	const navigate = useNavigate()

	const goToLogin = () => navigate(pathToLogin)

	return (
		<Table_1 headerTittle='Hello! Join us!'>
			<p className={style.message} onClick={goToLogin}>
				{children}
			</p>
		</Table_1>
	)
}

export default PleaseLoginBoard
