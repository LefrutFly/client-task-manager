import { ITaskDB } from '../../../types/task.interface'

export function sortCurrentTasks(t: ITaskDB[]): ITaskDB[] {
	return t.sort((a, b) => {
		if (a.isCompleted !== b.isCompleted) {
			return a.isCompleted ? 1 : -1
		}

		const timeA = a.timeTo.split(':')
		const timeB = b.timeTo.split(':')

		const hoursA = +timeA[0]
		const minutesA = +timeA[1]
		const hoursB = +timeB[0]
		const minutesB = +timeB[1]

		if (hoursA === hoursB) {
			return minutesA - minutesB
		} else {
			return hoursA - hoursB
		}
	})
}
