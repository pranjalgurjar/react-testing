import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Tokens } from '../../../../App'
import { TEST_endPointUrl } from '../../../../common/api/endPointUrl'

const Testseriesexplore = () => {
	const token = useContext(Tokens)
	const { tid } = useParams()
	const [exploreData, setExploreData] = useState()
	const studentID = localStorage.getItem("eXvctIdv")


	// console.log(exploreData);
	useEffect(() => {
		const Explore = () => {
			fetch(TEST_endPointUrl + "api/exam_study_material/test_series/", {
				method: "POST",
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					bundle_id: tid,
					student_id: studentID
				})
			}).then(response => response.json()).then(result => setExploreData(result)).catch(err =>{ 
				console.log(err)
			})
		}
		Explore()
	}, [token, tid, studentID])
	return (<>
		<div className="container-fluid">
			<ol className="breadcrumb">
				<li className="breadcrumb-item active">
					<Link className="d-flex align-self-center" onClick={() => window.history.back()}>
						<svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
						</svg>
						Back
					</Link>
				</li>
			</ol>
			<div className="row p-2">
				<h4 className="fc-toolbar-title text-black mb-4">Shaurya Test Series</h4>
				<div className="col-xl-8 col-xxl-8 ">
					<div className="row">
						{(exploreData && exploreData.length ? exploreData : [])?.map((item, index) => <div className="col-xl-12 col-sm-6">
							<div className="card">
								<div className="card-body">
									<div className="card-schedule mt-3 plan">
										<div className="d-flex justify-content-between content align-items-center">
											<h4>{item?.cat_name}
												<br /><small className="text-light">{item?.topic_name}</small>
											</h4>
											<button data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg" className="btn btn-primary btn-sm"><i className="bi bi-lock-fill" /> Start Now</button>
										</div>
									</div>
								</div>
								<div className="card-footer">
									<div className="justify-content-between content align-items-center">
										<span className="mr-2">
											<i className="bi-info-square" />
											{item?.no_of_qstns} Questions
										</span>
										<span className="mr-2">
											<i className="bi-journal-album" />
											{item?.marks} Marks
										</span>
										<span className="mr-2">
											<i className="bi-stopwatch" />
											{Math.floor(item?.time_duration / 60)} Hour {(item?.time_duration) % 60} Minutes
										</span>
									</div>
								</div>
							</div>
						</div>)}


					</div>
				</div>
				<div className="col-xl-3 col-xxl-4 ">
					<div className="row">
						<div className="col-xl-12 col-md-6">
							<div className="alert alert-warning alert-dismissible notification alert-alt fade show">
								<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close" />
								<p className="notificaiton-title mb-2 text-black"><strong>Flat Rs. 100 Off !</strong> Only Valid Till 31st October</p>
								<button className="btn btn-secondary btn-sm">Apply Coupon</button>
							</div>
							<div className="card h-auto">
								<div className="card-header border-0 pb-2">
									<h4>Total</h4>
								</div>
								<div className="card-body pt-0">
									<div className="courses-chart d-flex justify-content-between flex-wrap">
										<div className="d-flex align-items-center mb-2">
											<span className="book-icon bgl-secondary">
												<svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M28.2666 24.1334C27.3332 24.0001 26.3999 23.8668 25.3332 23.8668C21.9999 23.8668 18.7999 24.8001 15.9999 26.6668C13.1999 24.9334 9.9999 23.8668 6.66656 23.8668C5.73323 23.8668 4.66656 24.0001 3.73323 24.1334C3.06656 24.2668 2.53323 24.9334 2.66656 25.7334C2.7999 26.5334 3.46656 26.9334 4.26656 26.8001C5.06656 26.6668 5.86656 26.5334 6.66656 26.5334C9.73323 26.5334 12.6666 27.4668 15.1999 29.3334C15.5999 29.7334 16.2666 29.7334 16.7999 29.3334C19.9999 27.0668 23.9999 26.1334 27.7332 26.8001C28.3999 26.9334 29.1999 26.4001 29.3332 25.7334C29.4666 24.9334 28.9332 24.2668 28.2666 24.1334ZM28.2666 2.80011C27.3332 2.66678 26.3999 2.53345 25.3332 2.53345C21.9999 2.53345 18.7999 3.46678 15.9999 5.33345C13.1999 3.46678 9.9999 2.53345 6.66656 2.53345C5.73323 2.53345 4.66656 2.66678 3.73323 2.80011C3.1999 2.80011 2.66656 3.46678 2.66656 4.00011V20.0001C2.66656 20.8001 3.1999 21.3334 3.9999 21.3334C4.13323 21.3334 4.13323 21.3334 4.26656 21.3334C5.06656 21.2001 5.86656 21.0668 6.66656 21.0668C9.73323 21.0668 12.6666 22.0001 15.1999 23.8668C15.5999 24.2668 16.2666 24.2668 16.7999 23.8668C19.9999 21.6001 23.9999 20.6668 27.7332 21.3334C28.3999 21.4668 29.1999 20.9334 29.3332 20.2668C29.3332 20.1334 29.3332 20.1334 29.3332 20.0001V4.00011C29.3332 3.46678 28.7999 2.80011 28.2666 2.80011Z" fill="var(--secondary)" />
												</svg>
											</span>
											<div className="ms-2">
												<span>FLTs Full Length Tests</span>
												<h4 className="fs-18 font-w600">{(exploreData && exploreData.length) ? exploreData?.length : 0} Tests</h4>
											</div>
										</div>
										<svg className="mb-2" width={76} height={51} viewBox="0 0 76 51" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x={14} y="8.54712" width={6} height="42.4528" rx={3} fill="#FEC64F" />
											<rect x={42} y={29} width={6} height={22} rx={3} fill="#FEC64F" />
											<rect x={70} y="8.54712" width={6} height="42.4528" rx={3} fill="#FEC64F" />
											<rect x={56} width={6} height={51} rx={3} fill="#4CBC9A" />
											<rect x={28} y="17.0376" width={6} height="33.9623" rx={3} fill="#4CBC9A" />
											<rect y={23} width={6} height={28} rx={3} fill="#4CBC9A" />
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>)
}

export default Testseriesexplore
