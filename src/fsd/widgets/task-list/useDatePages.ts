import { useState } from 'react'
import { TasksService } from '../../../services/tasks/Task.service'
import { ITaskDB } from '../../../types/task.interface'
import { sortCurrentTasks } from './sortCurrentTasks'

export const useDatePage = () => {
	const todayDate = new Date().toLocaleDateString('ru-Ru')

	const [currentDisplayDate, setCurrentDisplayDate] =
		useState<string>(todayDate)

	const [currentTasks, setCurrentTasks] = useState<ITaskDB[]>([])

	const changeDate = (direction: number) => {
		const parts = currentDisplayDate.split('.')

		if (parts.length !== 3) return

		const day = +parts[0]
		const month = +parts[1] - 1
		const year = +parts[2]

		const date = new Date(year, month, day)
		date.setDate(date.getDate() + direction)
		setCurrentDisplayDate(date.toLocaleDateString('ru-Ru'))
	}

	const loadCurrentTasks = async () => {
		const t = await TasksService.getTasksByDate(currentDisplayDate)
		setCurrentTasks(sortCurrentTasks(t))
	}

	return { currentDisplayDate, currentTasks, changeDate, loadCurrentTasks }
}
