import Header from '../../widgets/header/Header'
import TaskList from '../../widgets/task-list/TaskList'
import style from './HomePage.module.scss'

const HomePage = () => {
	return (
		<div className={style.body}>
			<Header />
			<TaskList />
		</div>
	)
}

export default HomePage
