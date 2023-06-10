import React from 'react'
import { Link } from 'react-router-dom'

const BackKey = (props) => {
	const { path } = props

	const Back = () => {
		if (path === null) {
			window.history.back()
		}
	}

	return (
		<>
			<ol className="breadcrumb">
				<li className="breadcrumb-item active">
					<Link to={path} className="d-flex align-self-center" onClick={Back}>
						<svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
						</svg> Back </Link>
				</li>
			</ol>
		</>
	)
}

export default BackKey
