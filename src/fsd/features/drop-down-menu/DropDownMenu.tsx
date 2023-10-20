import { FC } from 'react'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import s from './DropDownMenu.module.scss'

export interface IDropDownMenuItem {
	title: string
	action: () => any
}

interface IDropDownMenuProps {
	className?: string
	items: IDropDownMenuItem[]
	close: () => any
}

const DropDownMenu: FC<IDropDownMenuProps> = ({ items, className, close }) => {
	return (
		<div className={`${className} ${s.body}`}>
			{items.length > 0 &&
				items.map((item, index) => (
					<div
						key={index}
						className={`${s.item} ${index !== 0 && s.demarcationLine}`}
						onClick={item.action}
					>
						{item.title}
					</div>
				))}
			<div className={`${s.item} ${s.arrowUp}`} onClick={close}>
				<MdOutlineKeyboardArrowUp />
			</div>
		</div>
	)
}

export default DropDownMenu
