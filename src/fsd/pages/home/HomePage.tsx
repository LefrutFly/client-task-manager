import Header from '../../widgets/header/Header'
import TasksPanel from '../../widgets/tasks-panel/TasksPanel'
import style from './HomePage.module.scss'

const HomePage = () => {
	return (
		<div className={style.body}>
			<Header />
			<TasksPanel />
		</div>
	)
}

export default HomePage
