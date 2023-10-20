import { FC, useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { pathToProfile } from '../../../config/const-config'
import { useAppDispatch } from '../../../hooks/reduxHook'
import { useAuth } from '../../../hooks/useAuth'
import { useProfile } from '../../../hooks/useProfile'
import { ProfileService } from '../../../services/profile/Profile.service'
import { clearUser } from '../../../store/auth.slice'
import { setProfile } from '../../../store/profile.slice'
import { formattingForDB } from '../../../utils/utils-for-string/deleteEmail'
import DropDownMenu from '../../features/drop-down-menu/DropDownMenu'
import style from './Header.module.scss'

interface IHeaderProps {
	prefix?: string
}

const HeaderLogged: FC<IHeaderProps> = ({ prefix = 'hello,' }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { email } = useAuth()

	const [userName, setUserName] = useState<string>('???')

	const { userName: uname } = useProfile()

	const loadProfile = async () => {
		let name: string

		if (uname) {
			name = uname
			setUserName(name)
		} else {
			const emailKey = formattingForDB(email)
			const profileData = await ProfileService.getByEmail(emailKey)
			name = profileData?.userName + ''
			dispatch(setProfile({ userName: name }))
			setUserName(name)
		}
	}

	useEffect(() => {
		loadProfile()
	}, [])

	const openUserBar = () => setIsOpen(!isOpen)

	const openProfile = () => navigate(pathToProfile)

	const logout = () => dispatch(clearUser())

	return (
		<header className={style.body}>
			<div className={style.wrapper}>
				<div className={style.titleContainer}>
					<span className={style.prefix}>{prefix.toLowerCase()}</span>
					<span className={style.userName} onClick={openUserBar}>
						{userName.toLowerCase()}
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
							title: 'Your profile',
							action: openProfile,
						},
						{
							title: 'Logout',
							action: logout,
						},
					]}
					close={openUserBar}
				/>
			)}
		</header>
	)
}

export default HeaderLogged
