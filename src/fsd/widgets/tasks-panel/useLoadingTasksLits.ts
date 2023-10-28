import { useState } from 'react'
import { TasksService } from '../../../services/tasks/Task.service'

export const useLoadingTasksLits = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const [isError, setIsError] = useState<boolean>(false)

	const [isEmpty, setEmpty] = useState<boolean>(true)

	const loadTasks = async (callback: () => any) => {
		try {
			const isExist = await TasksService.isTasksExist()
			if (isExist) {
				setEmpty(false)
				setIsLoading(false)
			} else {
				setEmpty(true)
			}
		} catch (error) {
			setIsError(true)
			console.error('Error loading tasks:', error)
		}

		callback()
	}

	return { loadTasks, isLoading, isError, isEmpty }
}
