import React, { useContext, useEffect, useState } from 'react'
import { Tokens } from '../../../App';
import axiosClient from "../../../webServices/webservice"
import { regExpEmail, regExpName } from '../../../RegExp/RegExp';
import { webUrls } from '../../../webServices/webUrls';


const Module = (props) => {
    const { user, ProfileApi, setShowModal, showModal } = props
    const token = useContext(Tokens)
    const [currentUser, setCurrentUser] = useState(user);
    const [nameErr, setNameErr] = useState()
    const [emailErr, setEmailErr] = useState()
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    const handleChange = e => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
        switch (name) {
            case "fullname": (regExpName(value)) ? setNameErr("Please Enter valid Name") : setNameErr("")
                break;

            case "email": !(regExpEmail(value)) ? setEmailErr("Invalid Email Address !") : setEmailErr("")
                break;
            default:
                break;
        }
    }

    const update = async (e) => {
        e.preventDefault()
        setIsUpdate(true)
        if (!(nameErr?.length > 0 || emailErr?.length > 0)) {
            try {
                let response = await axiosClient.put(`${webUrls.UPDATE_STUDENT_URL}`, {}, {
                    params: {
                        uid: currentUser.id,
                        name: currentUser.fullname,
                        fcm_token: token,
                        email: currentUser.email
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                if (response.status === 200) {
                    if (response.data.status) {
                        setIsUpdate(false)
                        ProfileApi()
                        setShowModal(false)
                    }
                }
            } catch (e) {
                console.log(e);
                setIsUpdate(false)
            }
            setCurrentUser('')
        } else {
            setIsUpdate(false)
        }
    }
    return (
        <div className={showModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"} tabIndex={-1} style={showModal ? { display: "block", paddingRight: "17px" } : { display: "none" }} >
            <div className="modal-dialog modal-md">
                <div className="modal-content h-auto">
                    <div className="card-header d-flex d-block">
                        <h4 className="modal-title text-primary">Student Profile</h4>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}>
                        </button>
                    </div>
                    <h4 className="background-warning text-center">Edit Details</h4>
                    <div className="modal-body">
                        <form onSubmit={update} >
                            <div className="mb-3">
                                <label className="mb-2"><strong>Student Name</strong></label>
                                <input type="text" className="form-control" placeholder="Enter Student Name" value={currentUser && currentUser?.fullname} name="fullname" onChange={handleChange} />
                                <label className="errorfield"><strong>{nameErr}</strong></label>
                            </div>
                            <div className="mb-3">
                                <label className="mb-2"><strong>Mobile Number</strong></label>
                                <input type="tel" className="form-control text-danger" placeholder="Enter Mobile Number" value={currentUser && currentUser?.mobile} name="mobile" disabled />
                            </div>
                            <div className="mb-3">
                                <label className="mb-2"><strong>Email</strong></label>
                                <input type="email" className="form-control" placeholder="Enter Emial Id" value={currentUser && currentUser?.email} name="email" onChange={handleChange} />
                                <label className="errorfield"><strong>{emailErr}</strong></label>
                            </div>{isUpdate ? <div className="text-center text-primary">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : <div className="text-center mt-4">
                                <button type="submit" className="btn btn-primary btn-block" >Update Details</button>
                            </div>}

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id='close' className="btn btn-danger light" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Module