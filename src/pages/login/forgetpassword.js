import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tokens } from '../../App'
import { TEST_endPointUrl } from '../../common/api/endPointUrl'
import { regExpMobile, regExpPassword } from '../../RegExp/RegExp'
import OtpInput from 'react-otp-input';
import "./forgetPass.css"
import  Image1  from './images/3.gif';
import bgImg from "./images/bg-1.jpg"

const Forgetpassword = () => {
	const navigate = useNavigate()
	const token = useContext(Tokens)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [mobile, setMobile] = useState("")
	const [password, setPassword] = useState()
	const [confirmPass, setConfirmPass] = useState()
	const [passErr, setPassErr] = useState()
	const [ispss, setIspss] = useState(false)
	const [errMsg, setErrMsg] = useState("")
	const [isError, setIsError] = useState(false)
	const [otpData, setOtpData] = useState()
	const [Loadings, setLoading] = useState(false)
	const [otpErrMsg, setOtpErrMsg] = useState("")
	const [otp, setOtp] = useState('');
	const [isChangePass, setIsChangepss] = useState(false)
	// console.log(otp);
	const onValidate = (e) => {
		setIsError(false)
		const { name, value } = e.target;
		setMobile(value);
		switch (name) {
			case "mobile": regExpMobile(value) ? setErrMsg("Please Enter valid mobile number") : (value.length !== 10) ? setErrMsg("Please Enter valid mobile number") : setErrMsg("")
				break;
			default:
				break;
		}
	}
	const sendOtp = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (errMsg.length || mobile.length !== 10) {
			setIsError(true)
			setErrMsg("Please Enter valid mobile number")
		} else {
			setIsError(false)
			let data = await fetch(TEST_endPointUrl + "api/send_otp/?mobile=" + mobile, {
				method: "POST",
				headers: {
					'Authorization': 'Bearer ' + token,
					"Content-Type": 'application/json'
				}
			})

			data = await data.json()
			if (data.status === "success") {
				setIsSubmitted(true)
				setLoading(false)
				setOtpData(data)
			} else {
				setIsSubmitted(false)
				setLoading(false)
				setOtpErrMsg("OTP send failed")
			}
		}
	}

	const isCheck = (e) => {
		e.preventDefault()
		if (otp === otpData.otp) {
			setIsSubmitted(false)
			setIsChangepss(true)
			setOtpErrMsg("")
		} else {
			setOtpErrMsg("Invalid OTP")
		}
	}

	const Validate = (e) => {
		setIspss(true)
		const { name, value } = e.target;
		setPassword(value);
		switch (name) {
			case "password": regExpPassword(value) ? setPassErr("(Use a combination of uppercase letters, lower case letters, numbers, and special characters (for example: !, @, &, %, +) in all passwords)") : setPassErr("")
				break;
			default:
				break;
		}
	}

	const confirmPsd = (e) => {
		setConfirmPass(e.target.value)
		setPassErr("")
	}
	// console.log(password);
	const upDatePassword = async (e) => {
		e.preventDefault()
		if (password === confirmPass && !passErr.length) {
			setLoading(true)
			setIspss(false)
			setPassErr("")
			// code api here
			let data = await fetch(TEST_endPointUrl + "api/student/forgot_password?mobile=" + mobile + "&new_password=" + password, {
				method: "POST",
				headers: {
					'Authorization': 'Bearer ' + token,
					"Content-Type": 'application/json'
				}
			});
			data = await data.json()
			// console.log(data);
			if (data.status === true) {
				setLoading(false)
				setIspss(false)
				setIsChangepss(false)
				navigate("/login")
				alert("password Updated")
			} else {
				setLoading(false)
			}

		} else {
			setIspss(true)
			setPassErr("new password and comfirm password are not same")
		}
	}
	return (
		<> <div className="body" style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", height: "100vh" }}>
			<div className="container">
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
										{isChangePass ? <>
											<div className="sign-in-your">

												<h4 className="fs-20 font-w600 text-primary">RESET PASSWORD</h4>
												<form onSubmit={upDatePassword}>
													<label className=" mt-3 fs-16"><strong>New Password</strong></label>
													<div className="input-group">
														<input type="password" name='password' className="form-control" placeholder="Enter new password.." onChange={Validate} />
													</div>
													<label className="text-danger"><strong>{ispss ? passErr : ""}</strong></label>
													<label className=" mt-3 fs-16"><strong>Confirm Password</strong></label>
													<div className="input-group">
														<input type="text" className="form-control" placeholder="Enter confirm password.." onChange={confirmPsd} />
													</div>
													<label className="text-danger"><strong></strong></label>

													<div className="text-center mb-4">
														{Loadings ? <div className="text-center text-primary">
															<div className="spinner-border" role="status">
																<span className="visually-hidden">Loading...</span>
															</div>
														</div> : <button type="submit" className="btn btn-primary btn-block">Change Password</button>}
													</div>
												</form>
											</div></> : <div className="sign-in-your">
											<div className='text-center'><h5 className='text-danger'>{otpErrMsg}</h5></div>
											<h4 className="fs-20 font-w600 text-primary text-center">{isSubmitted ? "Enter verification code" : ""}</h4>
											<form onSubmit={isSubmitted ? isCheck : sendOtp}>
												{isSubmitted ? "" : <><label className=" mt-3 fs-16"><strong>Mobile Number</strong></label>
													<div className="input-group">
														<span className="input-group-text"> <i className="bi bi-phone fs-20" style={{ color: '#886FFE' }} />
														</span>
														<input type="tel" name='mobile' maxLength={10} className="form-control" placeholder="Enter valid mobile number.." onChange={onValidate} />
													</div>
													<label className="text-danger"><strong>{isError ? errMsg : ""}</strong></label></>}


												{isSubmitted ?

													<OtpInput
														value={otp}
														onChange={setOtp}
														numInputs={6}
														containerStyle="inputStyle margin-top--small"
														inputStyle={{ width: "45px", textAlign: "center", borderRadius: "6px", border: "1px solid black" }}
														renderSeparator={<span style={{ fontSize: "16px" }}>&nbsp;-&nbsp;</span>}
														renderInput={(props) => <input {...props} />}
													/> : ""}

												{isSubmitted ? <div className="text-center mb-4">
													{Loadings ? <div className="text-center text-primary">
														<div className="spinner-border" role="status">
															<span className="visually-hidden">Loading...</span>
														</div>
													</div> : <button type="submit" className="btn btn-primary btn-block" disabled={otp?.length !== 6 ? true : false}>verify Otp</button>}
												</div> : <div className="text-center mb-4">
													{Loadings ? <div className="text-center text-primary">
														<div className="spinner-border" role="status">
															<span className="visually-hidden">Loading...</span>
														</div>
													</div> : <button type="submit" className="btn btn-primary btn-block" disabled={errMsg.length || mobile.length !== 10 ? true : false} >Send Otp</button>}
												</div>}
												{isSubmitted ? "" : <div className="row d-flex justify-content-between mt-4 mb-2">
													<div className="mb-2">
														<h5><Link to="/login" className='text-primary'>Sign in with Password?</Link></h5>
													</div>
												</div>}
												{/* <Link className='text-primary'>Register here </Link> */}
											</form>
										</div>}
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

export default Forgetpassword;
