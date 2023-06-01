import React, { useState } from 'react'

const TestQuestions = (props) => {
	const { testSeriesQuestions, nameindex, handalOption } = props
	const [showQuestions, setShowQuestions] = useState(true)
	return (
		<div className="col-lg-8 col-md-7 col-sm-12" >
			{testSeriesQuestions && testSeriesQuestions?.map((data, index) => {
				return (
					<div key={index}>
						<div className="card-header d-flex d-block">
							<h4 className="modal-title text-bold">Test:{nameindex} {data?.title}</h4>
						</div>
						<div className="card">
							<div className="card-body">
								<div className="course-details-tab style-2 mt-4">
									<nav>
										<div className="nav nav-tabs tab-auto fixed" id="nav-tab">
											<button className={showQuestions ? "nav-link active" : "nav-link"} id="nav-about-tab" onClick={() => setShowQuestions(true)}>
												<span className="mrr-2">
													<i className="bi-info-square" />  {data?.CategoryTestSeriesQuestions?.length} Questions
												</span>
											</button>
											<button className={showQuestions ? "nav-link" : "nav-link active"} id="nav-discussion-tab" onClick={() => setShowQuestions(false)}>
												<span className="mrr-2">
													<i className="bi-newspaper" /> Question Paper
												</span>
											</button>
										</div>
									</nav>
									<div className="tab-content mt-4" id="nav-tabContent">
										<div className={showQuestions ? "tab-pane fade show active" : "tab-pane fade"} id="nav-about" key={index}>
											<div className="chatbox_right" >
												{data?.CategoryTestSeriesQuestions?.map((test, index) => {
													const { question, opt_1, opt_2, opt_3, opt_4 } = test
													return (
														<div className="messages-line simplebar-content-wrapper2  scrollstyle_4" key={index}>
															<div className="simplebar-content-wrapper activee">
																<div className="user-status">
																	<div className="ques_item">
																		<div className="ques_title">
																			<span>Ques.<span id="new_qsn_no">({index + 1})</span>:- </span>
																			<span id="new_qsn"> {question}
																			</span>
																		</div>
																		<div className="ui form">
																			<div className="grouped fields" onChange={(e) => handalOption(e.target.value, test)}   >
																				<div className="card field fltr-radio">
																					<div className="ui radio checkbox">
																						<input type="radio" value="opt_1" name={index + 1} tabIndex={0} className="hidden mr-2" />
																						<label id="opt_1_text">{opt_1}</label>
																					</div>
																				</div>
																				<div className="field fltr-radio">
																					<div className="ui radio checkbox checked">
																						<input type="radio" value="opt_2" name={index + 1} tabIndex={0} className="hidden mr-2" />
																						<label id="opt_2_text">{opt_2}</label>
																					</div>
																				</div>
																				<div className="card field fltr-radio mt-4">
																					<div className="ui radio checkbox">
																						<input type="radio" value="opt_3" name={index + 1} tabIndex={0} className="hidden mr-2" />
																						<label id="opt_3_text">{opt_3}</label>
																					</div>
																				</div>
																				<div className="card field fltr-radio">
																					<div className="ui radio checkbox">
																						<input type="radio" value="opt_4" name={index + 1} tabIndex={0} className="hidden mr-2" />
																						<label id="opt_4_text">{opt_4}</label>
																					</div>
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
										<div className={showQuestions ? "tab-pane fade show" : "tab-pane fade show active"} id="nav-discussion" role="tabpanel"  >
											<div className="about-content">
												<div className="card-header d-flex">
													<h4 className="modal-title text-center">Question Paper</h4>
												</div>
												{data?.CategoryTestSeriesQuestions?.map((test, index) => {
													return (
														<div className="card-header d-flex d-block" key={index}>
															<h4 className="modal-title">Ques.({index + 1}):-{test?.question}
															</h4>
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
	)
}

export default TestQuestions
