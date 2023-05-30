import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from "../../../webServices/webservice"
import "./res.scss";
import { Tokens } from '../../../App';
import { regExpEmail, regExpMobile, regExpName, regExpPassword } from '../../../RegExp/RegExp';
import Image1 from './images/3.gif';
import bgImg from "./images/bg-1.jpg"
import { LOGIN } from '../../../route/route';
import { useDocumentTitle } from '../../../coustomhook';
import { webUrls } from '../../../webServices/webUrls'

const Registration = () => {
    useDocumentTitle("I-Magnus | Registration")
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [msg, setMsg] = useState(false)
    const [severError, setServerError] = useState(false)
    const [state, setState] = useState({
        password: '',
        mobile: '',
        email: '',
        fullname: '',
        isError: {
            password: '',
            mobile: '',
            email: '',
            fullname: ''
        },
    })


    const formValid = (state) => {
        let isValid = false;
        if ((state.isError.mobile.length > 0) || (state.isError.password.length > 0) || (state.isError.email.length > 0) || (state.isError.fullname.length > 0)) {
            isValid = false
            setMsg(true)
        } else {
            isValid = true
            setMsg(false)
        }
        return isValid;
    };
    const [mob, setMob] = useState(state.mobile)
    const [pass, setPass] = useState(state.password)
    const [nam, setNam] = useState(state.fullname)
    const [ema, setEma] = useState(state.email)

    const token = useContext(Tokens)

    const onSubmit = e => {
        e.preventDefault();
        if (formValid(state)) {
            resData()
            setMsg(false)
        } else {
            setMsg(true)
            // console.log(state)
            // console.log("Form is invalid!");
        }
    };

    const formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        const isError = { ...state.isError };
        switch (name) {
            case "fullname":
                isError.fullname =
                    (value.length === 0) ? "Please enter name" : value.length < 2 ? "Atleast 2 Characaters Required" : regExpName(value) ? "Please Enter valid Name" : ""
                setNam(value)
                setMsg(false)
                setServerError(false)
                break;
            case "mobile":
                isError.mobile =
                    (value.length === 0) ? "Please enter mobile number " : regExpMobile(value) ? "Please Enter valid Mobile Number" : (value.length !== 10) ? "Atleast 10 digits required" : "";
                setMob(value)
                setMsg(false)
                setServerError(false)

                break;
            case "password":
                isError.password =
                    (value.length === 0) ? "Please enter password" : regExpPassword(value) ? "(Use a combination of uppercase letters, lower case letters, numbers, and special characters (for example: !, @, &, %, +) in all passwords)" : (value.length < 6) ? "Atleast 6 characaters required" : "";
                setPass(value)
                setMsg(false)
                setServerError(false)

                break;
            case "email":
                isError.email = (value.length === 0) ? "please enter email address" : regExpEmail(value)
                    ? "" : "Invalid Email Address !";

                setEma(value)
                setMsg(false)
                setServerError(false)

                break;
            default:
                break;
        }
        setState({
            isError,
            [name]: value,
        })
    };

    const resData = async () => {
        let data = JSON.stringify({
            "fullname": nam,
            "mobile": mob,
            "email": ema,
            "password": pass,
        })

        try {
            let response = await axiosClient.post(webUrls.REGISTRATION_URL, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.status) {
                setUser(response.data)
                setTimeout(() => {
                    navigate(LOGIN);
                }, 3000)
                setMsg(false)
                setServerError(false)
            } else {
                setMsg(true)
                setServerError(true)
                setUser(response.data)
            }
        } catch (e) {
            // console.log(e);
        }
    }
    return (
        <div style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', height: "70rem" }}>
            <div className="container" style={{ width: "65%" }}>
                <div className="row align-items-center justify-contain-center">
                    <div className="col-xl-12 mt-4">
                        <div className="card mt-4">
                            <div className="card-body p-0">
                                <div className="row m-0">
                                    <div className="col-xl-7 col-md-7 sign text-center">
                                        <div>
                                            <img src={Image1} width="100%" alt='' />
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-md-5">
                                        <div className="sign-in-your">
                                            <h4 className="fs-20 font-w600 text-primary mb-2">Register your account</h4>
                                            {user?.status ? <div className="alert alert-success" role="alert">
                                                <h4 className="alert-heading">Registration Successfully !!</h4>
                                            </div> : ""}
                                            <form className="mt-4" onSubmit={onSubmit}>
                                                <div className="mb-2">
                                                    <label className="mb-2"><strong>Full Name</strong></label>
                                                    <input type="text" className="form-control" maxLength={25} name='fullname' value={nam} placeholder="Enter Full Name" onChange={formValChange} required />
                                                    <label className="errorfield"><strong>{state.isError.fullname}</strong></label>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="mb-2"><strong>Mobile Number</strong></label>
                                                    <input type="tel" className="form-control" name='mobile' maxLength={10} value={mob} placeholder="Enter Mobile Number" onChange={formValChange} required />
                                                    <label className="errorfield"><strong>{state.isError.mobile}</strong></label>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="mb-2"><strong>Email</strong></label>
                                                    <input type="email" className="form-control" maxLength={25} name='email' value={ema} placeholder="Enter Emial Id" onChange={formValChange} required />
                                                    <label className="errorfield"><strong>{state.isError.email}</strong></label>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="mb-2"><strong>Password</strong></label>
                                                    <input type="password" className="form-control" maxLength={18} name='password' value={pass} placeholder="Enter Password" onChange={formValChange} required />
                                                    <label className="errorfield"><strong>{state.isError.password}</strong></label>
                                                </div>
                                                <div className="mt-1">
                                                    {msg ? <h4 style={{ "color": "red" }}>invalid details {severError ? <>({user?.detail})</> : ""}</h4> : ""}
                                                </div>
                                                <div className="text-center mt-2">
                                                    <button className="btn btn-primary btn-block">Register</button>
                                                </div>
                                                <h5 className="mt-2"><strong>Already have an account?</strong> <Link to={LOGIN}>Sign in here </Link></h5>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Registration;