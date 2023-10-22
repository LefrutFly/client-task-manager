import { FC, useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import TaskList from '../task-list/TaskList'
import { useLoadingTasksLits } from './useLoadingTasksLits'

const TasksPanel: FC = () => {
	const { isAuth } = useAuth()

	const { loadTasks, isLoading, isError, tasks } = useLoadingTasksLits()

	const loadingComponent = <p>Loading...</p>
	const errorComponent = <p>Loading Error :(</p>
	const logoutComponent = <p>Login to see tasks</p>
	const showTasksList = <TaskList tasks={tasks} />

	const [currentComponent, setCurrentComponent] =
		useState<JSX.Element>(loadingComponent)

	useEffect(() => {
		if (isAuth) {
			loadTasks(() => {
				if (isError === true) {
					setCurrentComponent(errorComponent)
				} else if (isLoading === false) {
					setCurrentComponent(showTasksList)
				}
			})
		} else {
			setCurrentComponent(logoutComponent)
		}
	}, [isLoading, isAuth])

	return currentComponent
}

export default TasksPanel
