import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { TEST_endPointUrl } from '../../../../../common/api/endPointUrl';
import { Tokens } from '../../../../../App';

const Testseriesreport = () => {
  const token = useContext(Tokens)
  const { id ,nameindex,title,slug,cslug } = useParams()
  const studentId = localStorage.getItem("eXvctIdv")
  const result = JSON.parse(sessionStorage.getItem("test_result"))

  const correctScore = (result?.Right / result?.student?.[0]?.no_of_qstns) * 100;
  const wrongScore = (result?.Wrong / result?.student?.[0]?.no_of_qstns) * 100
  const notAttemptScore = (result?.notAttempt / result?.student?.[0]?.no_of_qstns) * 100

  const testName = result?.student[0]?.title
  const percentage = result?.Right
  const percentages = result?.Wrong
  const percentag = result?.notAttempt

  useEffect(() => {
    const saveData = () => {
      const data = JSON.stringify({
        "student_id": studentId,
        "test_series_id": id,
        "correct_ans": result?.Right,
        "wrong_ans": result?.Wrong,
        "skipped_qns": '2'
      });

      const config = {
        method: 'post',
        // maxBodyLength: Infinity,
        url: `${TEST_endPointUrl}api/student/test_record/`,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
    saveData();
  }, [id,token,result?.Right,result?.Wrong,studentId])
  return (
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to={`/subscription/${slug}/${cslug}`} className="d-flex align-self-center">
              <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
              </svg>
              <h4>Performance Report</h4>
            </Link>
          </li>
        </ol>
        <div className="p-4">
          <div className="row border-0">
            <div className=" col-xxl-4 col-lg-4 col-sm-4">
              <div className="widget-stat card">
                <div className="card-body p-4">
                  <div className="media ai-icon">
                    <span className="me-3 bgl-success text-success">
                      <i className="ti-check-box" />
                    </span>
                    <div className="media-body">
                      <p className="mb-1">Correct</p>
                      <h4 className="mb-0">{result?.Right}</h4>
                      <span className="badge badge-success">questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-xxl-4 col-lg-4 col-sm-4">
              <div className="widget-stat card">
                <div className="card-body p-4">
                  <div className="media ai-icon">
                    <span className="me-3 bgl-warning text-warning">
                      <i className="flaticon-381-diamond" />
                    </span>
                    <div className="media-body">
                      <p className="mb-1">Wrong</p>
                      <h4 className="mb-0">{result?.Wrong}</h4>
                      <span className="badge badge-warning">questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-xxl-4 col-lg-4 col-sm-4">
              <div className="widget-stat card">
                <div className="card-body p-4">
                  <div className="media ai-icon">
                    <span className="me-3 bgl-primary text-primary">
                      <i className="ti-cut" />
                    </span>
                    <div className="media-body">
                      <p className="mb-1">Not Attempt</p>
                      <h4 className="mb-0">{result?.notAttempt}</h4>
                      <span className="badge badge-primary">questions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-xxl-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">
                    <span className="text-danger">{testName} </span>
                  </h4>
                  <div className="row">
                    <div className=" col-xxl-3 col-lg-3">
                      <div className="widget-stat">
                        <div className="card-body p-4">
                          <div className="media ai-icon">
                            <div className="media-body">
                              <p className="mb-1"><i className="fa fa-pie-chart text-success" aria-hidden="true" /> Score</p>
                              <h4 className="mb-0"><b>{result?.Right}</b>/{result?.student?.[0]?.no_of_qstns}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" col-xxl-3 col-lg-3" />
                    <div className="card-header">
                      <h4 className="card-title">Detailed Performance</h4>
                      <div className="row">
                        <div className="col-12 mt-3">
                          <div className="d-flex justify-content-between">
                            <h6>{Math.floor(correctScore)}%</h6>
                            <span>Correct</span>
                          </div>
                          <div className="progressBar">
                            <ProgressBar now={percentage} striped variant="success" />
                          </div>
                        </div>
                        <div className="col-12 mt-3">
                          <div className="d-flex justify-content-between">
                            <h6>{Math.floor(wrongScore)}%</h6>
                            <span>Wrong</span>
                          </div>
                          <div className="progressBar">
                            <ProgressBar now={percentages} striped variant="info" />
                          </div>
                        </div>
                        <div className="col-12  mt-3">
                          <div className="d-flex justify-content-between">
                            <h6>{Math.floor(notAttemptScore)}%</h6>
                            <span>Not Attempt</span>
                          </div>
                          <div className="progressBar">
                            <ProgressBar now={percentag} striped variant="primary" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer d-sm-flex justify-content-between align-items-center">
                  <div className="card-footer-link mb-4 mb-sm-0">
                    
                      <Link to={`/subscription/${slug}/${cslug}/que/${id}/${nameindex}/${title}/`} className="btn btn-danger"><i className="bi-broadcast-pin" /> Re-attempt </Link>
                  
                  </div>
                  <Link to="testsolution">
                 <i className='btn btn-primary'><i className="bi-broadcast-pin " /> View Solutions</i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default Testseriesreport;