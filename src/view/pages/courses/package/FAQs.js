import React from 'react'
import img2 from "./images/faq-right.png"
import { useState } from 'react'

const FAQs = () => {
	const [showQues1, setShowQues1] = useState(false)
    const [showQues2, setShowQues2] = useState(false)
    const [showQues3, setShowQues3] = useState(false)
  return (
	<>
	  <div className="row mt-2">
                    <div className="col-xl-7 col-md-7 col-sm-7">
                        <div className="card h-auto mt-4">
                            <div className="card-header d-block">
                                <h4 className="card-title">FAQ's</h4>
                            </div>
                            <div className="card-body">
                                <div className="accordion accordion-start-indicator" id="accordion-five">
                                    <div className="accordion-item">
                                        <div className={showQues1 ? "accordion-header rounded-lg" : "accordion-header rounded-lg collapsed"} id="accord-5One" onClick={() => setShowQues1(!showQues1)} >
                                            <h5 className="accordion-header-text">Why should I enroll in the MPPSC Mains (Shaurya English Batch)?
                                            </h5>
                                            <span className="accordion-header-indicator" />
                                        </div>
                                        <div id="collapse5One" className={showQues1 ? "accordion__body collapse show" : "accordion__body collapse"} >
                                            <div className="accordion-body-text">
                                                <p style={{ fontSize: '13px' }}>iMagnus provides the learners preparing for MPPSC Mains Dhamaka Pack
                                                    exam access to courses by more than 10+ Super Teachers at a minimal fee. iMagnus is curated in
                                                    such a way that it covers all aspects of MPPSC Mains Dhamaka Pack preparations including
                                                    complete preparation for Prelims &amp; Mains, Current Affairs, GD, Interview, Descriptive writing
                                                    under one umbrella.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className={showQues2 ? "accordion-header rounded-lg" : "accordion-header collapsed rounded-lg"} id="accord-5Two" role="button" onClick={() => setShowQues2(!showQues2)}>
                                            <h5 className="accordion-header-text">Who are Super Teachers?</h5>
                                            <span className="accordion-header-indicator" />
                                        </div>
                                        <div id="collapse5Two" className={showQues2 ? "collapse accordion__body show" : "collapse accordion__body"} >
                                            <div className="accordion-body-text">
                                                <p style={{ fontSize: '13px' }}>Super Teachers are notably the best set of teachers across the
                                                    country in their respective subjects &amp; domains. They are not only known for their
                                                    distinguished skills to explain subjects but have also contributed to the success of thousands
                                                    of aspirants over the years making them the most preferable mentors for their respective
                                                    subjects.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <div className={showQues3 ? "accordion-header rounded-lg" : "accordion-header collapsed rounded-lg"} id="accord-5Three" role="button" onClick={() => setShowQues3(!showQues3)}>
                                            <h5 className="accordion-header-text">How can I get FREE Demo Lessons for Shaurya English Batch?</h5>
                                            <span className="accordion-header-indicator" />
                                        </div>
                                        <div id="collapse5Three" className={showQues3 ? "collapse accordion__body show" : "collapse accordion__body"} aria-labelledby="accord-5Three" data-bs-parent="#accordion-five">
                                            <div className="accordion-body-text">
                                                <p style={{ fontSize: '13px' }}>The iMagnus users simply have to click on “Start Free Demo” to
                                                    access the Free sessions of each Super Teacher &amp; can get additional access to the Study Notes,
                                                    Practice Questions, and Quizzes. New users will have to sign up using their Name, valid Email
                                                    ID, and a valid mobile number to access the free demo lessons.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-md-5 col-sm-5">
                        <img src={img2} height={450} className="mt-4 " alt='' />
                    </div>
                </div> 
	</>
  )
}

export default FAQs
