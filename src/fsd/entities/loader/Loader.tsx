import { CSSProperties } from 'react'

export const Loader = () => {
	const svgStyle: CSSProperties = {
		margin: 'auto',
		background: 'rgba(0, 0, 0, 0)',
		display: 'block',
		shapeRendering: 'auto',
	}

	return (
		<svg
			style={svgStyle}
			width='100px'
			height='100px'
			viewBox='0 0 100 100'
			preserveAspectRatio='xMidYMid'
		>
			<circle
				cx='50'
				cy='50'
				fill='none'
				stroke='#2e3239'
				strokeWidth='6'
				r='35'
				strokeDasharray='120 60'
			>
				<animateTransform
					attributeName='transform'
					type='rotate'
					repeatCount='indefinite'
					dur='1.282051282051282s'
					values='0 50 50;360 50 50'
					keyTimes='0;1'
				></animateTransform>
			</circle>
		</svg>
	)
}
