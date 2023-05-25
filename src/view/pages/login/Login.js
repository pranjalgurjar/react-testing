import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TEST_endPointUrl } from '../../../common/api/endPointUrl'
import { Tokens } from '../../../App';
import { regExpMobile } from '../../../RegExp/RegExp';
import Image1 from './images/3.gif';
import bgImg from "./images/bg-1.jpg"
import { FORGOT_PASS, HOME, REGISTRATION } from '../../../route/route';
import { useDocumentTitle } from '../../../coustomhook';


function Login(props) {
    useDocumentTitle("I-Magnus | Login")
    let {setProfileData,Alldata } = props
    const navigate = useNavigate()
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [passShow, setPassShow] = useState(false);
    const [user, setUser] = useState("")
    const [severError, setServerError] = useState(false)
    const [msg, setMsg] = useState(false)
    const [state, setState] = useState({
        mobile: "",
        password: "",
        isError: {
            password: '',
            mobile: '',
        },
    })
    const [mob, setMobile] = useState(state.mobile)
    const [pass, setPassword] = useState(state.password)
    // token from contextApi
    const token = useContext(Tokens)

    // for validations
    const formValid = (state) => {
        let isValid = false;
        if (state.isError.mobile.length > 0 || state.isError.password.length > 0) {
            isValid = false
            setMsg(true)
        } else {
            isValid = true
            setMsg(false)
        }
        return isValid;
    };

    // for suubmit
    const onSubmit = (e) => {
        setIsSubmitted(true)
        e.preventDefault();
        if (formValid(state)) {
            setMsg(false)
            saveData()
        } else {
            setMsg(true)
            setIsSubmitted(false)
            // console.log(state)
            // console.log("Form is invalid!");
        }
    };
    // for main validation function
    const formValChange = e => {
        setIsSubmitted(false)
        e.preventDefault();
        const { name, value } = e.target;
        const isError = { ...state.isError };
        switch (name) {
            case "mobile":
                isError.mobile =
                    regExpMobile(value) ? "Enter valid mobile number" : (value.length !== 10) ? "Atleast 10 digits required" : "";
                setMobile(value)
                setMsg(false)
                setServerError(false)
                break;
            case "password":
                isError.password =
                    (value.length === 0) ? "please enter password" : (value.length < 6) ? "Atleast 6 characaters required" : "";
                setPassword(value)
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
    // for login Api fetch
    const saveData = () => {
        const data = JSON.stringify({ "mobile": mob, "password": pass })
        var config1 = {
            method: 'post',
            url: TEST_endPointUrl + 'api/student/login',
            headers: {

                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config1)
            .then((response) => {
                if (response.data.status) {
                    setProfileData(response.data.message)
                    setServerError(false)
                    localStorage.setItem("eXvctIdv", response.data.message.id)
                    localStorage.setItem("userdata", JSON.stringify(response.data.message))
                    navigate(HOME);
                    Alldata()
                    setIsSubmitted(false)
                } else {
                    setIsSubmitted(false)
                    setUser(response.data)
                    setMsg(true);
                    setServerError(true)
                }

            }).catch((error) => {
                setIsSubmitted(false)
                // console.log("error", error);
            });
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", height: "60rem", backgroundRepeat: "no-repeat" }}>
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
                                                <h4 className="fs-20 font-w600 text-primary">Sign in your account</h4>
                                                <span>Welcome back! Login with your data that you entered<br /> during
                                                    registration</span>
                                                <form onSubmit={onSubmit}>
                                                    <label className=" mt-3 fs-16"><strong>Mobile Number</strong></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text"> <i className="bi bi-phone fs-20" style={{ color: '#886FFE' }} />
                                                        </span>
                                                        <input type="tel" name='mobile' maxLength={10} className="form-control" placeholder="Enter Mobile Number.." value={mob} onChange={formValChange} />
                                                    </div>
                                                    <p className="loginerror mt-1" style={{ "color": "red" }}><strong>{state.isError.mobile}</strong></p>
                                                    <label className="mb-2 fs-16"><strong>Password </strong></label>
                                                    <div className="input-group">
                                                        <span className="input-group-text"> <i className="bi bi-shield-lock fs-20" style={{ color: '#886FFE' }} />
                                                        </span>
                                                        <input type={!passShow ? "password" : "text"} name='password' className="form-control" value={pass} placeholder="Enter Your password" onChange={formValChange} required />
                                                        <span className="input-group-text show-pass showpass" onClick={() => setPassShow(!passShow)}>
                                                            <i className="bi bi-eye-slash" />
                                                        </span>
                                                    </div>
                                                    <p className="loginerror mt-1" style={{ "color": "red" }}><strong>{state.isError.password}</strong></p>
                                                    {msg ? <h4 style={{ "color": "red" }} htmlFor="basic_checkbox_1">Invalid form details !{severError ? <>{user?.message}</> : ""}</h4> : ""
                                                    }
                                                    <div className="row d-flex justify-content-between mt-4 mb-2">
                                                        <div className="mb-2">
                                                            <h5><Link to={FORGOT_PASS}>Forgot Password?</Link></h5>
                                                        </div>
                                                    </div>
                                                    {isSubmitted ? <div className="text-center text-primary">
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div> : <div className="text-center mb-3">
                                                        <button type="submit" className="btn btn-primary btn-block">Sign Me In</button>
                                                    </div>}
                                                    <h5 className="mt-2"><strong>don't have an account?</strong> <Link to={REGISTRATION}>Register here </Link></h5>
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
            <div>
            </div>
        </>
    )
}
export default Login;