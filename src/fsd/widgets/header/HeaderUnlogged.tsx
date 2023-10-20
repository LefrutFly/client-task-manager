import { useState } from 'react'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { pathToLogin, pathToRegister } from '../../../config/const-config'
import DropDownMenu from '../../features/drop-down-menu/DropDownMenu'
import style from './Header.module.scss'

const HeaderUnlogged = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const navigate = useNavigate()

	const openUserBar = () => setIsOpen(!isOpen)

	const register = () => navigate(pathToRegister)

	const login = () => navigate(pathToLogin)

	return (
		<header className={style.body}>
			<div className={style.wrapper}>
				<div className={style.titleContainer}>
					<span className={style.userName} onClick={openUserBar}>
						hello! who are you?
					</span>
				</div>
				<MdKeyboardDoubleArrowDown
					className={style.userButton}
					onClick={openUserBar}
				/>
			</div>
			{isOpen && (
				<DropDownMenu
					items={[
						{
							title: 'create a new account',
							action: register,
						},
						{
							title: 'login',
							action: login,
						},
					]}
					close={openUserBar}
				/>
			)}
		</header>
	)
}

export default HeaderUnlogged
