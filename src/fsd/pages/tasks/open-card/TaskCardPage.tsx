import { useNavigate, useParams } from 'react-router-dom'
import { pathToHome } from '../../../../config/const-config'
import Button_1 from '../../../shared/buttons/button_1/Button_1'
import Table_1 from '../../../shared/tables/table_1/Table_1'

const TaskCardPage = () => {
	const { id } = useParams()

	const navigate = useNavigate()

	const cancel = () => navigate(pathToHome)

	return (
		<Table_1 headerTittle={`TaskCardPage - ${id}`}>
			<Button_1 variant={'red'} onClick={cancel}>
				cancel
			</Button_1>
		</Table_1>
	)
}

export default TaskCardPage
