import { get, ref, remove, set } from 'firebase/database'
import { rtdb } from '../../config/firebase/firebase'
import {
	ITaskByForm,
	ITaskCard,
	ITaskDB,
	TypeOfTask,
} from '../../types/task.interface'
import { LocalStorageService } from '../localStorage/LocalStorageService.service'

const tasksUrl = 'tasks/'

export const TasksService = {
	async getTasks(): Promise<ITaskDB[]> {
		const key = LocalStorageService.loadUser().id
		const link = tasksUrl + key
		const rtdbRef = ref(rtdb, link)

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
				timeTo: 'ER:RR',
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
	async getTaskById(taskId: number): Promise<ITaskDB> {
		const key = LocalStorageService.loadUser().id
		const link = tasksUrl + key + '/' + taskId
		const rtdbRef = ref(rtdb, link)

		let snapshot

		const errorTask: ITaskDB = {
			id: 0,
			userId: '0',
			title: 'Error!',
			description: 'Error!Error!',
			isCompleted: true,
			type_of_task: TypeOfTask.RED,
			date: 'ER.RO.R!!!',
			timeTo: 'ER:RR',
		}

		try {
			snapshot = await get(rtdbRef)
		} catch (error) {
			console.log(error)
		}

		if (snapshot) {
			if (snapshot.exists()) {
				const tasksData = snapshot.val()
				const tasks: ITaskDB = { ...tasksData }
				return tasks
			} else {
				return errorTask
			}
		} else {
			return errorTask
		}
	},
	async getTasksByDate(date: string): Promise<ITaskDB[]> {
		const tasks = await this.getTasks()
		let tasksForDate: ITaskDB[] = []
		tasks.map(task => {
			if (task.date === date) tasksForDate.push(task)
		})
		return tasksForDate
	},
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

			const dateFormatted = new Date().toLocaleDateString('ru')

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
					timeTo: '00:00',
				}
				await this.updateTaskByID(taskId, newTask, key)
			} else {
				console.log('User not found!')
			}
		} catch (error) {
			console.log(error)
		}
	},
	async createTaskByForm(newTask: ITaskByForm, id?: string) {
		try {
			let key
			if (id) {
				key = id
			} else {
				key = LocalStorageService.loadUser().id
			}

			if (key) {
				const taskId: number = await this.getLength()
				const createdTask: ITaskDB = {
					id: taskId,
					userId: key,
					title: newTask.title,
					description: newTask.description,
					isCompleted: false,
					type_of_task: newTask.type_of_task,
					date: newTask.date,
					timeTo: newTask.timeTo,
				}
				await this.updateTaskByID(taskId, createdTask, key)
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
				userId: key,
				...newTask,
			})
				.then(_ => {})
				.catch(error => {
					const errorCode = error.code
					const errorMessage = error.message

					console.log(`${errorCode} :: ${errorMessage}`)
				})
		} catch (error) {
			console.log(error)
		}
	},
	async updateCompletedTaskById(
		taskId: number,
		newCompleted: boolean,
		id?: string
	) {
		try {
			let key
			if (id) {
				key = id
			} else {
				key = LocalStorageService.loadUser().id
			}
			const newTask = await this.getTaskById(taskId)
			newTask.isCompleted = newCompleted
			this.updateTaskByID(taskId, newTask)
		} catch (error) {
			console.log(error)
		}
	},
	async deleteTaskById(taskId: number) {
		const key = LocalStorageService.loadUser().id
		const link = tasksUrl + key + '/' + taskId
		const rtdbRef = ref(rtdb, link)
		remove(rtdbRef)
	},
}
