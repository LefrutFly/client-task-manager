import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import s from './Button_1.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'green' | 'red'
}

const Button_1: FC<PropsWithChildren<IButtonProps>> = ({
	children,
	className,
	variant,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={`${s.body} ${className} ${
				variant === 'green' ? s.green : s.red
			}`}
		>
			<h5>{children}</h5>
		</button>
	)
}

export default Button_1
