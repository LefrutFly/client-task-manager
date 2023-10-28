import { ButtonHTMLAttributes, FC } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import s from './ArrowButton.module.scss'

interface IArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'back' | 'forward'
}

const ArrowButton: FC<IArrowButtonProps> = ({
	className,
	variant = 'back',
	...rest
}) => {
	return (
		<button {...rest} className={`${s.body} ${className}`}>
			{variant === 'back' ? <IoIosArrowBack /> : <IoIosArrowForward />}
		</button>
	)
}

export default ArrowButton
