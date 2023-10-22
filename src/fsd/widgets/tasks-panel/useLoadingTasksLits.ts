import { useState } from 'react'
import { TasksService } from '../../../services/tasks/Task.service'
import { ITaskDB } from '../../../types/task.interface'

export const useLoadingTasksLits = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const [isError, setIsError] = useState<boolean>(false)

	const [tasks, setTasks] = useState<ITaskDB[]>([])

	const loadTasks = async (callback: () => any) => {
		try {
			const length = await TasksService.getLength()
			if (length > 0) {
				const t = await TasksService.getTasks()
				const filteredArray = t.filter(
					element => element !== null && element !== undefined
				)
				setTasks(filteredArray)
				setIsLoading(false)
			} else {
				setIsError(true)
			}
		} catch (error) {
			setIsError(true)
			console.error('Error loading tasks:', error)
		}

		callback()
	}

	return { loadTasks, isLoading, isError, tasks }
}
