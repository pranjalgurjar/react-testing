import React from 'react'
import Skeleton from 'react-loading-skeleton'
import * as view from "../../../../view/view"
import { Link } from 'react-router-dom'

const PackageDetails = (props) => {
	const { packageLoading, user, redioButton, coursePackage } = props
	return (
		<>
			{packageLoading ? user?.length ?
				<div className="basic-form">
					<form>
						<div className="mb-3 mb-0">
							{user?.map((pdata, index) => {
								// console.log(pdata, "pdata")
								return (
									<div className="form-check custom-checkbox mb-2" key={index}>
										<input type="radio" value={pdata} defaultChecked={index === 0}
											onChange={() => redioButton(pdata)} className="form-check-input" id="customRadioBox7" name="pdata" />
										<label className="form-check-label" htmlFor="customRadioBox7" style={{ width: '100%' }}>
											<div className="alert alert-white left-icon-big fade show">
												<div className="media">
													<div className="alert-left-icon-big">
														<span><i className="mdi mdi-help-circle-outline" /></span>
													</div>
													<div className="media-body">
														<div className="dlab-info">
															<div className="dlab-title d-flex justify-content-between">
																<div className="mt-2">
																	{coursePackage ? <h5>
																		<Link >{coursePackage?.name}
																		</Link><br />
																		<p className="mt-2 text-primary"><i className="bi-clipboard" /> {pdata?.SubscriptionPlan?.name} - {pdata.validity} months</p>
																	</h5> : <Skeleton borderRadius={10} highlightColor='#ccccff' height={25} width={300} />}
																</div>
																<div className="course_price ml-auto text-primary">
																	<span>₹{coursePackage && coursePackage ? coursePackage?.CourseSubscriptionPlans_course[index]?.discount_price : 0}</span>
																	<br />₹{pdata && pdata ? pdata?.plan_price : 0}
																</div>
															</div>
															<div className="row mt-2">
																<div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps">
																	<ul className="timeline">
																		<li>
																			<div className="timeline-badge info" />
																			<Link className="timeline-panel text-muted" >
																				<p className="mb-0">{pdata && pdata ? pdata?.no_of_videos : 0}+ Video Lectures</p>
																			</Link>
																		</li>
																		<li>
																			<div className="timeline-badge success" />
																			<Link className="timeline-panel text-muted" >
																				<p className="mb-0">{pdata?.no_of_tests}+ Test Series </p>
																			</Link>
																		</li>
																	</ul>
																</div>
																<div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps ps--active-y">
																	<ul className="timeline">
																		<li>
																			<div className="timeline-badge dark" />
																			<Link className="timeline-panel text-muted" >
																				<p className="mb-0">{pdata?.no_of_notes}+ PDF Notess</p>
																			</Link>
																		</li>
																		<li>
																			<div className="timeline-badge danger" />
																			<Link className="timeline-panel text-muted" >
																				<p className="mb-0">Live Classes-{pdata?.live_classes_access ? "Available" : "Not Available"} </p>
																			</Link>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</label>
									</div>
								)
							})}
						</div>
					</form>
				</div> : <div className="alert alert-white text-center mt-5" role="alert">
					<h5 className='text-danger'>This course Package are unavailable !</h5>
				</div> :
				<div className='mt-5'><view.LOADER /></div>}
		</>
	)
}

export default PackageDetails
