import { get, ref, set } from 'firebase/database'
import { rtdb } from '../../config/firebase/firebase'
import { ITaskCard, ITaskDB, TypeOfTask } from '../../types/task.interface'
import { LocalStorageService } from '../localStorage/LocalStorageService.service'

const tasksUrl = 'tasks/'

export const TasksService = {
	async getTasks(): Promise<ITaskDB[]> {
		const key = LocalStorageService.loadUser().id
		const rtdbRef = ref(rtdb, tasksUrl + key)

		let snapshot

		const errorTask: ITaskDB[] = [
			{
				id: 0,
				userId: '0',
				title: 'Error!',
				description: 'Error!Error!',
				isCompleted: true,
				type_of_task: TypeOfTask.RED,
				date: 'ER.RO.R!!!',
			},
		]

		try {
			snapshot = await get(rtdbRef)
		} catch (error) {
			console.log(error)
		}

		if (snapshot) {
			if (snapshot.exists()) {
				const tasksData = snapshot.val()
				const tasks: ITaskDB[] = [...tasksData]
				return tasks
			} else {
				return errorTask
			}
		} else {
			return errorTask
		}
	},
	async getTaskById(id: number) {},
	async getLength(): Promise<number> {
		let length = 0

		try {
			const tasks = await this.getTasks()
			length = tasks.length
		} catch (error) {
			console.log(error)
		}

		return length
	},
	async createEmptyTask(id?: string) {
		try {
			let key
			if (id) {
				key = id
			} else {
				key = LocalStorageService.loadUser().id
			}
			let dateNow: Date = new Date()
			const dateFormatted =
				dateNow.getDate().toString().padStart(2, '0') +
				'.' +
				dateNow.getMonth().toString().padStart(2, '0') +
				'.' +
				dateNow.getFullYear()

			if (key) {
				const taskId: number = await this.getLength()
				const newTask: ITaskDB = {
					id: taskId,
					userId: key,
					title: 'New Task!',
					description: 'Write in more detail about your task here:',
					isCompleted: false,
					type_of_task: TypeOfTask.BLUE,
					date: dateFormatted,
				}
				await this.updateTaskByID(taskId, newTask, key)
			} else {
				console.log('User not found!')
			}
		} catch (error) {
			console.log(error)
		}
	},
	async updateTaskByID(taskId: number, newTask: ITaskCard, id?: string) {
		try {
			let key
			if (id) {
				key = id
			} else {
				key = LocalStorageService.loadUser().id
			}
			await set(ref(rtdb, `${tasksUrl}${key}/${taskId}`), {
				id: taskId,
				userId: key,
				...newTask,
			})
				.then(_ => {
					console.log('success push!')
				})
				.catch(error => {
					const errorCode = error.code
					const errorMessage = error.message

					console.log(`${errorCode} :: ${errorMessage}`)
				})
		} catch (error) {
			console.log(error)
		}
	},
}
