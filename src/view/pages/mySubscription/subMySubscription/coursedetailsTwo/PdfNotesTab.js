import React from 'react'
const PdfNotesTab = (props) => {
	
	const { pdfNotesTab, details, searchData } = props

	return (
		<div className={pdfNotesTab ? "tab-pane fade show active" : "tab-pane fade"} id="nav-pdfnotes">
			{(details?.Notes?.length) ? <>
				{details?.Notes?.map((coursePdf, index1) => {
					return (
						<div className="about-content" key={index1}>
							<div className="widget-heading d-flex justify-content-between align-items-center">
								<h4 className="m-0">{coursePdf?.topic?.name} ({coursePdf?.CategoryNotes?.length})</h4>
							</div>
							<div className="row">
								{(searchData && searchData.length ? searchData : coursePdf?.CategoryNotes)?.map((topicData, index) => {
									return (
										<div className="col-xl-3 col-sm-3" key={index}>
											<div className="card">
												<div className="card-body">
													<div className="card-schedule plan">
														<div className="row justify-content-between content align-items-center">
															<div className="col-xl-10 col-sm-10">

																<p>{topicData?.title}</p>
															</div>
															<div className="col-xl-2 col-sm-2">
																<a href={topicData?.notes_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-xs">
																	<i className="bi-download" />
																</a>
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
				})}
			</> : <>
				<div className="card mt-4">
					<div className="card-body mr-2">
						<h5 className="text-red text-center"> No Pdf Notes Available</h5>
					</div>
				</div>
			</>}
		</div>
	)
}

export default PdfNotesTab
