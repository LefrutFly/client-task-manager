import { InputHTMLAttributes, forwardRef } from 'react'
import { IconType } from 'react-icons'
import s from './FormField.module.scss'

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	Icon?: IconType
	error?: string
}

export const FormField = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, error, className, type = 'text', style, Icon, ...rest },
		ref
	) => {
		return (
			<div className={`${s.body} ${className}`} style={style}>
				<label className={s.label}>
					<span className={s.placeholder}>
						{Icon && <Icon className={s.placeholderIcon} />}
						{placeholder}
					</span>
					<input
						ref={ref}
						type={type}
						placeholder={placeholder}
						className={`${s.input}`}
						autoComplete='on'
						{...rest}
					/>
				</label>
				{error && <div className={s.error}>{error}</div>}
			</div>
		)
	}
)
