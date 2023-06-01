import React from 'react'
import { Link } from 'react-router-dom'

const TestSeriesTab = (props) => {

    const { testSeriesTab, details, searchData, handleclick } = props

    return (
        <div className={testSeriesTab ? "tab-pane fade show active" : "tab-pane fade"} id="nav-testseries">
            {(details?.TestSeries?.length) ? <>
                {details?.TestSeries?.map((courseTest, index1) => {
                    return (
                        <div className="about-content" key={index1}>
                            <div className="widget-heading d-flex justify-content-between align-items-center">
                                <h4 className="fc-toolbar-title text-black mt-4" > Test Series for {courseTest?.topic?.name} ({courseTest?.CategoryTestSeries?.length ? courseTest?.CategoryTestSeries?.length : 0}) </h4>
                            </div>

                            <div className="row mt-4" key={index1}>
                                {(searchData && searchData.length ? searchData : courseTest?.CategoryTestSeries)?.map((testdata, index) => {
                                    return (
                                        <div className="col-xl-3 col-sm-3" key={index}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-schedule plan">
                                                        <div className="row justify-content-between content align-items-center">
                                                            <div className="col-xl-10 col-sm-10">
                                                                <p>TEST:{index + 1} {testdata?.title}</p>
                                                            </div>
                                                            <div className="col-xl-2 col-sm-2">
                                                                <Link className="btn btn-primary btn-xs" onClick={() => handleclick(testdata, index)}>
                                                                    <i className="bi-journal-text" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="justify-content-between content align-items-center">
                                                        <span className="mr-2">
                                                            <i className="bi-info-square" /> {testdata?.no_of_qstns}Ques </span>
                                                        <span className="mr-2">
                                                            <i className="bi-journal-album" /> {testdata?.marks}Marks </span>
                                                        <span className="mr-2">
                                                            <i className="bi-stopwatch" /> {Math.floor(testdata?.time_duration / 60)} Hour {testdata?.time_duration % 60} Min </span>
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
                        <h5 className="text-red text-center"> No TestSeries Available</h5>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default TestSeriesTab
