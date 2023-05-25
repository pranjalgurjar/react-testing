import React from 'react'
import planet from "./images/svg/planet.svg"
import skill from "./images/svg/skill.svg"
import readingtime from "./images/svg/readingtime.svg"
import puzzle from "./images/svg/puzzle.svg"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProfileCard = (props) => {
	const { handleEditClick, profileData } = props
	return (
		<>
			<div className="col-xl-4 col-xxl-4">
				<div className="card instructors-box h-auto">
					<div className="card-body">
						<div className="instructors-media mt-3">
							<div className="instructors-media-info text-center mt-4">
								{profileData ? <img src={profileData?.dp} alt="" />:<Skeleton highlightColor='#ccccff' borderRadius={25} height="135px" width="135px"/>}
								<ul className="list-group list-group-flush mt-4">
								{profileData ?<li className="list-group-item d-flex px-0 justify-content-between">
										<strong>Student</strong>
										<span className="mb-0">{profileData?.fullname}</span>
									</li>:<Skeleton highlightColor='#ccccff' width={300} height={30}/>}
									{profileData ?<li className="list-group-item d-flex px-0 justify-content-between">
										<strong>Mobile</strong>
										<span className="mb-0">{profileData?.mobile}</span>
									</li>:<Skeleton highlightColor='#ccccff' width={300} height={30}/>}
									{profileData ?<li className="list-group-item d-flex px-0 justify-content-between">
										<strong>Email</strong>
										<span className="mb-0">{profileData?.email}</span>
									</li>:<Skeleton highlightColor='#ccccff' width={300} height={30}/>}
									{profileData ?<li className="list-group-item d-flex px-0 justify-content-between">
										<strong>Member Since</strong>
										<span className="mb-0">{new Date(profileData?.created_at).toDateString()}</span>
									</li>:<Skeleton highlightColor='#ccccff' width={300} height={30}/>}
								</ul>
							</div>
						</div>
						<div className="achievements ">
							<div className="card-schedule mb-4">
								<div className="d-flex justify-content-between content align-items-center">
								{profileData ?<button className="btn btn-primary btn-sm text-left"
										onClick={handleEditClick}>
										<i className="bi-pencil-square"></i> Edit details
									</button>:<Skeleton highlightColor='#ccccff' height={35} width={120}/>}

								</div>
							</div>

							<h4 className="text-start mb-4">Achievements</h4>
							<div className="achievements-content flex-wrap">
							{profileData ?<span><img src={planet} alt="" /></span>:<Skeleton highlightColor='#ccccff' height={60} width={60}/>}
							{profileData ?<span><img src={skill} alt="" /></span>:<Skeleton highlightColor='#ccccff' height={60} width={60}/>}
								{profileData ?<span><img src={readingtime} alt="" /></span>:<Skeleton highlightColor='#ccccff' height={60} width={60}/>}
								{profileData ?<span><img src={puzzle} alt="" /></span>:<Skeleton highlightColor='#ccccff' height={60} width={60}/>}
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	)
}

export default ProfileCard
