import React from 'react'
import { Link } from 'react-router-dom'

const Card = (props) => {

	const { tabs, tabPannel } = props.data

	return (
		<div className="tab-content" id="nav-tabContent">
			<div className="tab-pane fade active show" id="nav-about">
				<div className='row mt-2'>
					{tabPannel && tabPannel?.courses?.map((item, index) => {
						return (
							<div className="col-xl-4 col-md-6 col-sm-12" key={index}>
								<div className="card all-crs-wid h-auto">
									<div className="card-body">
										<div className="courses-bx">
											<div className="dlab-media">
												<img src={item?.web_icon} alt="" />
											</div>
											<div className="dlab-info">
												<div className="dlab-title d-flex justify-content-between">
													<div className="mt-2">
														<h4>
															<Link to={`details/${item?.slug}`} >{item?.name}</Link>
														</h4>
														<p className="m-0">{(tabPannel && tabPannel.is_active) ? tabPannel?.name : tabs[0]?.name}</p>
													</div>
													<div className="course_price ml-auto text-primary">
														<span>₹{item?.CourseSubscriptionPlans_course?.reduce((min, price) => price?.plan_price < min ? price.discount_price : min, item?.CourseSubscriptionPlans_course[0]?.discount_price)}</span>

														<br />₹{item?.CourseSubscriptionPlans_course?.reduce((min, price) => price?.plan_price < min ? price.plan_price : min, item?.CourseSubscriptionPlans_course[0]?.plan_price)}
													</div>
												</div>
												<div id="DZ_W_TimeLine" className="widget-timeline dlab-scroll ps mt-4">
													<ul className="timeline">
														<li>
															<div className="timeline-badge info"></div>
															<Link className="timeline-panel text-muted" to="">
																<h6 className="mb-0"><i className="bi-file-earmark-play"></i> {item?.CourseSubscriptionPlans_course?.reduce((min, sum) => min + sum?.no_of_videos, 0)}+ Video Lectures</h6>
															</Link>
														</li>
														<li>
															<div className="timeline-badge success"></div>
															<Link className="timeline-panel text-muted" to="">
																<h6 className="mb-0"><i className="bi-book"></i> {item?.CourseSubscriptionPlans_course?.reduce((min, sum) => min + sum?.no_of_notes, 0)}+ PDF Notes </h6>
															</Link>
														</li>
														<li>
															<div className="timeline-badge dark"></div>
															<Link className="timeline-panel text-muted" to="">
																<h6 className="mb-0"><i className="bi-journal-text"></i> {item?.CourseSubscriptionPlans_course?.reduce((min, sum) => min + sum?.no_of_tests, 0)}+ Test Series</h6>
															</Link>
														</li>
														<li>
															<div className="timeline-badge danger"></div>
															<Link className="timeline-panel text-muted" to="">
																<h6 className="mb-0"><i className="bi-camera-reels"></i> Live Classes - {item?.liveClasses_course?.length ? "Available" : "Not Available"}</h6>
															</Link>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="card-footer">
										<div className="d-flex justify-content-between content align-items-center">
											<Link to={`details/${item?.slug}`} className="btn btn-warning btn-sm">
												<i className="bi-view-list"></i> Explore </Link>
											<Link to={`${item?.slug}`} className="btn btn-primary btn-sm">
												<i className="bi-cart3"></i> Buy Now </Link>
										</div>
									</div>
								</div>
							</div>)
					})}
				</div>
			</div>
		</div>
	)
}

export default Card
