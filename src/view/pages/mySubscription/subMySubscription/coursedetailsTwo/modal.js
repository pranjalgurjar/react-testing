import React from 'react'
import { Link } from 'react-router-dom'
const Modal = (props) => {
    const { modal,indexdata, testSrModelShow,setTestSrModelShow } = props

    // console.log(indexdata,'lll')

    return (
        <div className={testSrModelShow?"modal fade bd-example-modal-lg show":"modal fade bd-example-modal-lg"} tabIndex={-1} role="dialog" style={testSrModelShow?{display:"block",paddingRight:"17px"}:{display:"none"}} >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="card-header d-flex d-block">
                        <h4 className="modal-title text-primary">{modal?.title}</h4>
                        <button type="button" className="btn-close" onClick={()=>setTestSrModelShow(false)} />
                    </div>
                    <h4 className="background-warning text-center">Instructions</h4>
                    <div className="modal-body scrollspy">
                        <div id="en-instruction" style={{ display: 'block' }}>
                            <div className="ft-b">
                                <p>
                                    <strong>
                                        <u>General Instructions</u>
                                    </strong>
                                </p>
                            </div>
                            <div className="ft-b">
                                <ol>
                                    <li> Total duration of examination is <b>{modal?.time_duration}</b> minutes. </li>
                                    <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                                    <li>The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols: <ul className="ot-ased-ins-li list-unstyled">
                                        <li>
                                            <span id="ot-ased-not-vis">1.</span> You have not visited the question yet.
                                        </li>
                                        <li>
                                            <span id="ot-ased-not-ans">2.</span> You have not answered the question.
                                        </li>
                                        <li>
                                            <span id="ot-ased-hv-ans">3.</span> You have answered the question.
                                        </li>
                                        <li>
                                            <span id="ot-ased-mrk-ans">4.</span> You have NOT answered the question, but have marked the question for review.
                                        </li>
                                        <li>
                                            <span id="ot-ased-mrk-nt">5.</span> You have answered the question, but marked it for review.
                                        </li>
                                        <div>The Marked for Review status for a question simply indicates that you would like to look at that question again. <span id="ot-ased-red">If a question is answered and Marked for Review, your answer for that question will be considered in the evaluation.</span>
                                        </div>
                                    </ul>
                                    </li>
                                    <li>You can click on the "&gt;" arrow which appears to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on "&lt;" which appears on the right side of question window.</li>
                                </ol>
                                <p>
                                    <strong>
                                        <u>Navigating to a Question : </u>
                                    </strong>
                                </p>
                                <ol start={5}>
                                    <li>To answer a question, do the following: </li>
                                    <ul type="a">
                                        <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                                        <li>Click on <b>Save &amp; Next </b> to save your answer for the current question and then go to the next question. </li>
                                        <li>Click on <b>Mark for Review &amp; Next</b> to save your answer for the current question, mark it for review, and then go to the next question. </li>
                                    </ul>
                                </ol>
                                <p>
                                    <strong>
                                        <u>Answer a Question : </u>
                                    </strong>
                                </p>
                                <ol start={6}>
                                    <li>Procedure for answering a multiple choice type question: </li>
                                    <ul type="a">
                                        <li>To select your answer, click on the button of one of the options</li>
                                        <li>To deselect your chosen answer, click on the button of the chosen option again or click on the <b>Clear Response </b>button </li>
                                        <li>To change your chosen answer, click on the button of another option</li>
                                        <li>To save your answer, you MUST click on the <b>Save &amp; Next</b> button </li>
                                        <li>To mark the question for review, click on the <b>Mark for Review &amp; Next</b> button.If an answer is selected for a question that is Marked for Review, that answer will be considered in the evaluation. </li>
                                    </ul>
                                    <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
                                    <li>Note that ONLY Questions for which answers are saved or marked for review after answering will be considered for evaluation.</li>
                                </ol>
                                <p>
                                    <strong>
                                        <u>Navigating through sections: </u>
                                    </strong>
                                </p>
                                <ol start={9}>
                                    <li>Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by clicking on the section name. The section you are currently viewing is highlighted.</li>
                                    <li>After clicking the Save &amp; Next button on the last question for a section, you will automatically be taken to the first question of the next section.</li>
                                    <li>You can shuffle between tests and questions anytime during the examination as per your convenience only during the time stipulated.</li>
                                    <li>Candidate can view the corresponding section summary as part of the legend that appears in every section above the question palette.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger light" onClick={()=>setTestSrModelShow(false)} >Close</button>

                        <Link to={`que/${modal?.id}/${indexdata + 1}/${modal?.title}`} type="button" className="btn btn-primary" onClick={() =>setTestSrModelShow(false)}>I am ready to begin</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal