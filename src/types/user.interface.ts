export interface IUserAuth {
	email: string
	password: string
}

export interface IUser extends IUserAuth {
	userName: string
}
