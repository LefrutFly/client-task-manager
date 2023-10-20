import { useAuth } from '../../../hooks/useAuth'
import HeaderLogged from './HeaderLogged'
import HeaderUnlogged from './HeaderUnlogged'

const Header = () => {
	const { isAuth } = useAuth()

	return isAuth ? <HeaderLogged /> : <HeaderUnlogged />
}

export default Header
