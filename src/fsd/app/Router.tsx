import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
	pathToCreateNewTask,
	pathToHome,
	pathToLogin,
	pathToProfile,
	pathToRegister,
} from '../../config/const-config'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import HomePage from '../pages/home/HomePage'
import ProfilePage from '../pages/profile/ProfilePage'
import CreateNewTaskPage from '../pages/tasks/create-new/CreateNewTaskPage'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={pathToHome} element={<HomePage />} />
				<Route path={pathToProfile} element={<ProfilePage />} />
				<Route path={pathToRegister} element={<RegisterPage />} />
				<Route path={pathToLogin} element={<LoginPage />} />
				<Route path={pathToCreateNewTask} element={<CreateNewTaskPage />} />

				<Route path='*' element={<div>Not found</div>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
