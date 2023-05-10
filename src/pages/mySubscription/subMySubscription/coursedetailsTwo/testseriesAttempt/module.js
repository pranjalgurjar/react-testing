import React from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap';
const Modale = (props) => {
    const { show, handleClose, student, Attempt, notAttempt, dataSubmit } = props
  
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h4 className="text-center">Submit Your Test</h4>
                    <div className="table-responsive mt-4 text-center">
                        <table className="table success-table-bordered">
                            <thead className="thead-warning">
                                <tr>
                                    <th scope="col">No. of questions</th>
                                    <th scope="col">Attempted</th>
                                    <th scope="col">Not Attempted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="fs-18">
                                    <td>{student.length? student[0]?.CategoryTestSeriesQuestions?.length:"0"}</td>
                                    <td>{student.length?Attempt:"0"}</td>
                                    <td>{student.length?notAttempt:"0"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-danger light" onClick={handleClose} >
                        Close
                    </Button>
                    <Link to="report">
                        <Button variant="primary" onClick={dataSubmit}>
                            Submit Test
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Modale