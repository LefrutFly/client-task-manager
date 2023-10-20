// import axios from 'axios'
// import { TasksService } from '../../services/tasks/Task.service'

// jest.mock('axios')

// describe('Tasks Service Test', () => {
// 	// let response = `{id: 1, title: 'First Task', description: 'I need to finish a website with a task manager', isCompleted: false, type_of_task: 'GREEN'}`
// 	let r = {
// 		id: 1,
// 		title: 'First Task',
// 		description: 'I need to finish a website with a task manager',
// 		isCompleted: false,
// 		type_of_task: 'GREEN',
// 	}
// 	let response = JSON.stringify(r)
// 	test('Try getById', async () => {
// 		axios.get = jest.fn().mockResolvedValue(response)
// 		const data = await TasksService.getById(1)
// 		const d = JSON.stringify(data)
// 		expect(axios.get).toBeCalledTimes(1)
// 		expect(d).toEqual(response)
// 	})
// })
