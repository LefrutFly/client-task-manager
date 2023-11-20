import { useParams } from 'react-router-dom'

const TaskCardPage = () => {
	const { id } = useParams()
	return <div>TaskCardPage - {id}</div>
}

export default TaskCardPage
