export enum TypeOfTask {
	GREEN = 'GREEN',
	RED = 'RED',
	BLUE = 'BLUE',
}

export interface ITaskDB {
	id: number
	userId: number
	title: string
	description: string
	isCompleted: boolean
	type_of_task: TypeOfTask
	date: string
}

export interface ITaskCard extends Omit<ITaskDB, 'id' | 'userId'> {}
