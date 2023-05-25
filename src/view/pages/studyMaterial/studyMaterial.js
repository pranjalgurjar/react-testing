import React from 'react'
import { useDocumentTitle } from '../../../coustomhook'

const StudyMaterial = () => {
    useDocumentTitle("I-magnus | Study Material")
    return (
        <>
            <div className="container-fluid">
                <div className="course-details-tab style-2">
                    <nav>
                        <div className="nav nav-tabs justify-content-start tab-auto" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-about" aria-selected="true">MPPSC Civil Services</button>
                            <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">MPPSC Forest Services</button>
                            <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">UPSC Civil Services</button>
                            <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">One Day Exam Preparation</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="card mt-4">
                            <div className="card-body mr-2">
                                <h4 className='text-center text-primary '>Coming Soon</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudyMaterial