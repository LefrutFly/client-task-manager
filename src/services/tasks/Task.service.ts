import axios from 'axios'
import { tasksUrl } from '../../config/const-config'
import { ITaskDB } from '../../types/task.interface'

const baseUrl = import.meta.env.VITE_SERVER_URL + tasksUrl

export const TasksService = {
	async getAll(userId: number) {
		try {
			const url: string = baseUrl
			return (await axios.get<ITaskDB[]>(url)).data
		} catch (error) {
			console.log(error)
		}
	},
	async getById(id: number) {
		try {
			const url: string = baseUrl + `?id=${id}`
			return (await axios.get(url)).data[0]
		} catch (error) {
			console.log(error)
		}
	},
	async checkExistsComponentByID(id: number) {
		try {
			const response = await axios.head(baseUrl + `?id=${id}`)
			return response.status === 200
		} catch (error) {
			console.log(error)
		}
	},
	async deleteBuId(id: number) {
		try {
			const exist = await this.checkExistsComponentByID(id)
			if (exist) await axios.delete(baseUrl + `/${id}`)
		} catch (error) {
			console.log(error)
		}
	},
	async updateBuId(id: number, updatedTask: ITaskDB) {
		try {
			const exist = await this.checkExistsComponentByID(id)
			if (exist) await axios.put(baseUrl + `/${id}`, updatedTask)
		} catch (error) {
			console.log(error)
		}
	},
	async createNew(data: ITaskDB) {
		try {
			let newData: ITaskDB = { ...data }
			const response = await axios.post<ITaskDB>(baseUrl, newData)
			return response.data
		} catch (error) {
			console.log(error)
		}
	},
}
