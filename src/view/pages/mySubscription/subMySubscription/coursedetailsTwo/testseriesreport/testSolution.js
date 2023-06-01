import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const TestSolution = () => {

	const result = JSON.parse(sessionStorage.getItem("test_result"))
	const name = result?.testSeriesQuestions?.[0]?.title
	const iddata = result?.option
	const [showQuestions, setShowQuestions] = useState(true)

	return (
		<div className="container">
			<ol className="breadcrumb">
				<li className="breadcrumb-item active">
					<Link className="d-flex align-self-center" onClick={() => window.history.back()}>
						<svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
						</svg>
						<h4>{name} : Test Series Solutions</h4>
					</Link>
				</li>
			</ol>
			<div className="row p-4">
				{result?.testSeriesQuestions?.map((data, index) => {
					return (
						<div className="col-xl-12 col-xxl-12" key={index}>
							<div className="card">
								<div className="card-body">
									<div className="course-details-tab style-2">
										<nav>
											<div className="nav nav-tabs tab-auto fixed" id="nav-tab" role="tablist">
												<button className={showQuestions ? "nav-link active" : "nav-link"} id="nav-about-tab" type="button" onClick={() => setShowQuestions(true)} >
													<span className="mrr-2">
														<i className="bi-info-square" /> {data?.CategoryTestSeriesQuestions?.length} Questions
													</span>
												</button>
												<button className={showQuestions ? "nav-link" : "nav-link active"} id="nav-discussion-tab" type="button" onClick={() => setShowQuestions(false)} >
													<span className="mrr-2">
														<i className="bi-newspaper" /> Question Paper
													</span>
												</button>
											</div>
										</nav>
										<div className="tab-content mt-4" id="nav-tabContent">
											<div className={showQuestions ? "tab-pane fade show active" : "tab-pane fade"} id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
												{data?.CategoryTestSeriesQuestions?.map((test, index) => {
													const { question, opt_1, opt_2, opt_3, opt_4, solution, answer, id } = test
													// console.log(test, "test")
													var file = iddata?.find(item => item.id === id)
													// console.log(file);
													return (

														<div className="chatbox_right" key={index}>
															<div className="messages-line simplebar-content-wrapper2  scrollstyle_4">
																<div className="simplebar-content-wrapper activee">
																	<div className="user-status">
																		<div className="ques_item">
																			<div className="ques_title">
																				<span>Ques.<span id="new_qsn_no">{index + 1}</span>:- </span>
																				<span id="new_qsn">{question} </span>
																			</div>
																			<div className="ui form">
																				<div className="grouped fields">
																					<div className={(Object.keys(test)?.[2].trim() === answer?.trim()?.replace("-","")) ? "alert alert-success solid alert-dismissible fade show show mt-4" : (Object.keys(test)?.[2].trim() === file?.answer) ? "alert alert-danger solid alert-dismissible fade show show mt-4" : "alert alert  alert-dismissible fade show show mt-4"}>
																						{/* <svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
																							<circle cx={12} cy={12} r={10} />
																							<path d="M8 14s1.5 2 4 2 4-2 4-2">
																							</path>
																							<line x1={9} y1={9} x2="9.01" y2={9}>
																							</line>
																							<line x1={15} y1={9} x2="15.01" y2={9}>
																							</line>
																						</svg> */}
																						{opt_1}
																					</div>
																					<div className={(Object.keys(test)?.[3].trim() === answer?.trim()?.replace("-","")) ? "alert alert-success solid alert-dismissible fade show show mt-4" : (Object.keys(test)?.[3].trim() === file?.answer) ? "alert alert-danger solid alert-dismissible fade show show mt-4" : "alert alert  alert-dismissible fade show show mt-4"}>
																						{/* 
																						<svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
																							<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2">
																							</polygon>
																							<line x1={15} y1={9} x2={9} y2={15}>
																							</line>
																							<line x1={9} y1={9} x2={15} y2={15}>
																							</line>
																						</svg> */}
																						{opt_2}
																					</div>
																					<div className={(Object.keys(test)?.[4].trim() === answer?.trim()?.replace("-","")) ? "alert alert-success solid alert-dismissible fade show show mt-4" : (Object.keys(test)?.[4].trim() === file?.answer) ? "alert alert-danger solid alert-dismissible fade show show mt-4" : "alert alert  alert-dismissible fade show show mt-4"}>

																						{/* <svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
																							<circle cx={12} cy={12} r={10} />
																							<path d="M8 14s1.5 2 4 2 4-2 4-2">
																							</path>
																							<line x1={9} y1={9} x2="9.01" y2={9}>
																							</line>
																							<line x1={15} y1={9} x2="15.01" y2={9}>
																							</line>
																						</svg> */}
																						{opt_3}
																					</div>
																					<div className={(Object.keys(test)?.[5].trim() === answer?.trim()?.replace("-","")) ? "alert alert-success solid alert-dismissible fade show show mt-4" : (Object.keys(test)?.[5].trim() === file?.answer) ? "alert alert-danger solid alert-dismissible fade show show mt-4" : "alert alert  alert-dismissible fade show show mt-4"}>
																						{/* <svg viewBox="0 0 24 24" width={24} height={24} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2">
																							<polyline points="9 11 12 14 22 4">
																							</polyline>
																							<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11">
																							</path>
																						</svg> */}
																						{opt_4}
																					</div>
																				</div>
																			</div>
																			<div className="ques_title  mt-4">
																				<span>Solution:</span>
																				<small> {solution}</small>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													)
												})}
											</div>
											<div className={showQuestions ? "tab-pane fade show" : "tab-pane fade show active"} id="nav-discussion" >
												<div className="about-content" key={index}>
													<div className="card-header d-flex">
														<h4 className="modal-title text-center">Question Paper</h4>
													</div>
													{data?.CategoryTestSeriesQuestions?.map((test, index) => {
														return (
															<div className="card-header d-flex d-block" key={index}>
																<h4 className="modal-title">Ques.{index + 1}:- {test?.question}</h4>
															</div>
														)
													})}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>

	)
}

export default TestSolution