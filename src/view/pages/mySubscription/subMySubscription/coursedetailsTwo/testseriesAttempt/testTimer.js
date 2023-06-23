import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { CountDownComponent } from '../../../../../../components/count down/CountDownComponent';

const TestTimer = (props) => {

	const { testSeriesQuestions, option, dataAdd, setShow, dataSubmit } = props
	const ti_me = testSeriesQuestions[0]?.time_duration


	function TimeEnd() {
		setShow(true)
		dataAdd()
		dataSubmit()
	}

	return (
		<div className="col-lg-4 col-md-5" >
			{testSeriesQuestions && testSeriesQuestions?.map((data, index) => {
				return (
					<div className="bg-v fixedd mt-6" style={{ width: "300px", position: "sticky" }} key={index}>
						<div className="card-header d-block">
							<h5 className="card-title">Time Left
								<CountDownComponent ti_me={ti_me} handleTimeEnd={TimeEnd} />
							</h5>
						</div>
						<h4 className="background-warning text-center">Section: Practise Test</h4>
						<div className="row mrleft_height card-body scrollspy">
							{data?.CategoryTestSeriesQuestions?.map((queData, index) => {
								return (
									<div className="col-lg-1 col-md-1 col-sm-1 media mrr-2" key={index}>
										<button style={{ backgroundColor: `${(option.find(item => item?.id === queData?.id)) ? "green" : ""}`, color: `${(option.find(item => item?.id === queData?.id)) ? "white" : ""}` }} className="btn bt-white">{index + 1}</button>
									</div>
								)
							})}
						</div>
						<div className="card-footer d-sm-flex justify-content-between align-items-center">
							<Button type="button" id='button' variant="btn btn-secondary" onClick={() => { dataAdd(); setShow(true) }}>
								Submit Test
							</Button>
							<div className="card-footer-link mb-4 mb-sm-0">
								<div className="basic-dropdown">
									<div className="dropdown dropstart ">
										<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
											<i className="bi-exclamation-square-fill" /> Report
										</button>
										<div className="dropdown-menu">
											<h5 className="dropdown-header">Report</h5>
											<Link className="dropdown-item">Wrong Question</Link>
											<Link className="dropdown-item">Formatting Issue</Link>
											<Link className="dropdown-item">Wrong Translations</Link>
											<Link className="dropdown-item">Others</Link>
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

export default TestTimer
