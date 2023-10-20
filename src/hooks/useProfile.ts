import { useAppSelector } from './reduxHook'

export const useProfile = () => {
	const { userName } = useAppSelector(state => state.profile)

	return {
		userName: userName,
	}
}
