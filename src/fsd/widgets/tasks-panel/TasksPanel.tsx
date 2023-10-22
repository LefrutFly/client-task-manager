import { FC, useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { ErrorBoard } from '../../entities/errors/ErrorBoard'
import { Loader } from '../../entities/loader/Loader'
import PleaseLoginBoard from '../../entities/login-board/PleaseLoginBoard'
import TaskList from '../task-list/TaskList'
import { useLoadingTasksLits } from './useLoadingTasksLits'

const TasksPanel: FC = () => {
	const { isAuth } = useAuth()

	const { loadTasks, isLoading, isError, tasks } = useLoadingTasksLits()

	const loadingComponent = <Loader />
	const errorComponent = <ErrorBoard>Loading Error :(</ErrorBoard>
	const logoutComponent = (
		<PleaseLoginBoard>Login to see tasks</PleaseLoginBoard>
	)
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
