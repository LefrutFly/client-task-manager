export enum TypeOfTask {
	GREEN = 'GREEN',
	RED = 'RED',
	BLUE = 'BLUE',
}

export interface ITaskDB {
	id: number
	userId: string
	title: string
	description: string
	isCompleted: boolean
	type_of_task: TypeOfTask
	date: string
	timeTo: string
}

export interface ITaskCard extends Omit<ITaskDB, 'userId'> {
	sortTasks: () => Promise<void>
}

export interface ITaskByForm
	extends Omit<ITaskDB, 'id' | 'userId' | 'isCompleted'> {}
