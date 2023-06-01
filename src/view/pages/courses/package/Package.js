import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TEST_KEY } from '../../../../ApiBaseUrl/endPointUrl'
import axiosClient from "../../../../webServices/webservice"
import img from "./favicon.png"
import CouponModel from './couponModel'
import { Tokens } from '../../../../App'
import Loader from '../../../../components/loader/Loader'
import { COURSES } from '../../../../route/route'
import FAQs from './FAQs'
import { webUrls } from '../../../../webServices/webUrls'
import useOtherJs from '../../../../coustomhook/UseOtherJs'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Title, useDocumentTitle } from '../../../../coustomhook'

const Package = (props) => {

    useDocumentTitle(`${Title.documentTitle} | Packages | ${Title.backTitle}`)
    const { ProfileApi, couresPageData } = props
    const token = useContext(Tokens)
    const { cslug } = useParams()
    const coursePackage = useOtherJs(couresPageData, cslug)
    const user_id = localStorage.getItem("eXvctIdv")
    const user_data = JSON.parse(localStorage.getItem("user_data"))
    const sub_scription = JSON.parse(localStorage.getItem("user_subscription"))
    const [user, setUser] = useState([])
    const [coupons, setCoupons] = useState()
    const [subscription, setSubscription] = useState()

    // for filter coupans data
    const [applyCoupan, setApply] = useState(0)
    const [coupanData, setCoupanData] = useState([])
    const [totalPrice, setTotalprice] = useState()
    const [isCheck, setIscheck] = useState(false)
    const [loading, setLoading] = useState(false)
    const [packageLoading, setPackageLoading] = useState(true)
    const [coupanName, setCoupanName] = useState()
    const [showCoupanModal, setShowCoupanModal] = useState(false)
    /* for payment */
    const [PaymetSuccessData, setPaymetSuccessData] = useState()
    const [alreadyBuy, setAlreadyBuy] = useState(false)
    const [payMsg, setPayMsg] = useState(false)
    /* for expand FAQ's Questions */


    useEffect(() => {
        // for pakage data 
        if (cslug && user_id && token) {
            const saveData = async () => {
                setPackageLoading(false)
                try {
                    let response = await axiosClient.get(`${webUrls.SUBSCRIPTION_PLANS_URL}${cslug}/${user_id}/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (response.status === 200) {
                        setUser(response.data)
                        setPackageLoading(true)
                        setSubscription(response.data?.[0])
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            saveData()
        }
    }, [cslug, user_id, token])


    //  for select plane price button change
    const redioButton = (data) => {
        setSubscription(data)
        setIscheck(false)
    }


    // for payment proccessing
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // for amount and order id generate
    const handlePayment = async (Amount, sid) => {
        let isSubscription = sub_scription?.find(item => item?.subscription?.id === sid)
        if (isSubscription?.subscription?.id === sid) {
            setAlreadyBuy(true)
            function removeAlret() {
                setTimeout(() => { setAlreadyBuy(false) }, 3000)
            }
            removeAlret()
        } else {

            if (Amount > 0) {
                try {
                    setLoading(true)
                    const res = await loadScript(
                        "https://checkout.razorpay.com/v1/checkout.js"
                    );

                    if (!res) {
                        alert("Razorpay SDK failed to load. Are you online?");
                        setLoading(false)
                        return;
                    }

                    let orderData = JSON.stringify({ amount: Amount })

                    let result = await axiosClient.post(webUrls.CREATE_ORDER_ID_URL, orderData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": 'application/json'
                        }
                    })
                    if (!result.data.status === 200) {
                        setLoading(false)
                        alert("Server error. Are you online?");
                        return;
                    } else {
                        setLoading(false)
                    }
                    const amount = Amount * 100;
                    const order_id = result.data.order_id

                    const options = {
                        'key': TEST_KEY, // Enter the Key ID generated from the Dashboard
                        'amount': amount,
                        'currency': "INR",
                        'name': "Imagnus",
                        'description': coursePackage?.description,
                        'image': img,
                        'order_id': order_id,
                        'handler': async function (response) {
                            let data = JSON.stringify({
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                gateway_name: "razorpay",
                                coupon: ApplyCoupan?.status ? coupanName?.name : "",
                                coupon_discount: ApplyCoupan?.status ? ApplyCoupan?.coupon_discount : 0,
                                notes: subscription?.SubscriptionPlan?.name,
                                source: "web",
                                bill_amount: amount,
                                student_id: user_id,
                                subscription_id: subscription?.id
                            })

                            let paymentDone = await axiosClient.post(webUrls.PLACE_ORDER_URL, data, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    "Content-Type": 'application/json'
                                }
                            })
                            if (paymentDone?.status === 200) {
                                ProfileApi()
                                setPaymetSuccessData(paymentDone)
                            } else {
                                console.log(paymentDone.data)
                            }

                        },
                        'prefill': {
                            'name': user_data?.name,
                            'email': user_data?.email,
                            'contact': user_data?.mobile,
                        },
                        'readonly': {
                            'contact': true,
                            'email': true,
                        },
                        theme: {
                            color: "#8A2BE2",
                        },
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open()
                } catch (e) {
                    console.log(e);
                }
            } else {
                if (Amount === 0 || Amount === undefined) {
                    try {
                        setLoading(true)
                        let data = JSON.stringify({
                            "mobile": [
                                user_data?.mobile
                            ],
                            "subscription_id": subscription?.id,
                            "bill_amount": 0
                        })
                        let response = await axiosClient.post(webUrls.PLACE_MANUAL_ORDER_URL, data, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                "Content-Type": 'application/json'
                            }
                        })
                        if (response.data?.success?.[0].status_code === 200) {
                            ProfileApi()
                            setLoading(false)
                            setPayMsg(true)
                            function removeAlert() {
                                setTimeout(() => {
                                    setPayMsg(false)
                                }, 3000);
                            }
                            removeAlert()
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }



    // console.log(applyCoupan,coupanName,"co");
    const filterCoupon = () => {
        let result = coupons?.filter(item => item.subscription_id === subscription?.id)
        setCoupanData(result)
        setShowCoupanModal(true)
    }


    useEffect(() => {
        // for get coupons 
        if (token && coursePackage?.id) {
            const Coupan = async () => {
                try {
                    let reqData = JSON.stringify({
                        student_id: user_id,
                        course_id: coursePackage?.id
                    })
                    let response = await axiosClient.post(webUrls.GET_COUPON_URL, reqData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "Content-Type": 'application/json'
                        }
                    })
                    if (response.status === 200) {
                        setCoupons(response.data)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            Coupan()
        }
    }, [token, user_id, coursePackage?.id])

    const ApplyCoupan = async (item) => {
        try {
            setCoupanName(item)
            let reqData = JSON.stringify({
                student_id: user_id,
                coupon: item?.name,
                course_id: coursePackage?.id,
                subscription_id: item?.subscription_id
            })
            let response = await axiosClient.post(webUrls.APPLY_COUPON_URL, reqData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            })
            if (response.status === 200) {
                setTotalprice(subscription?.plan_price - response.data?.coupon_discount)
                setApply(response.data)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="container-fluid">
                {payMsg ? <div className="alert alert-success" role="alert">
                    <p style={{ fontSize: "16px" }}>Your Subscription plan successfully added to My Subscription Section. Go and Checkout It.</p>
                </div> : ""}
                {PaymetSuccessData?.status ? <div className="alert alert-success" role="alert">
                    <h3 className="alert-heading">Payment Success !</h3>
                    <p style={{ fontSize: "16px" }}>Your Subscription plan successfully added to My Subscription Section. Go and Checkout It.</p>
                    <hr />
                    <p className="mb-0" style={{ fontSize: "16px" }}>{PaymetSuccessData?.message}.To get invoice go to My profile page</p>
                </div> : ""}
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active">
                        <Link to={`/${COURSES}`} className="d-flex align-self-center">
                            <svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.99981 12C8.99905 11.8684 9.02428 11.7379 9.07404 11.6161C9.12381 11.4942 9.19713 11.3834 9.28981 11.29L13.2898 7.28999C13.4781 7.10168 13.7335 6.9959 13.9998 6.9959C14.2661 6.9959 14.5215 7.10168 14.7098 7.28999C14.8981 7.47829 15.0039 7.73369 15.0039 7.99999C15.0039 8.26629 14.8981 8.52168 14.7098 8.70999L11.4098 12L14.6998 15.29C14.8636 15.4813 14.9492 15.7274 14.9395 15.979C14.9298 16.2307 14.8255 16.4695 14.6474 16.6475C14.4693 16.8256 14.2305 16.93 13.9789 16.9397C13.7272 16.9494 13.4811 16.8638 13.2898 16.7L9.28981 12.7C9.10507 12.5137 9.00092 12.2623 8.99981 12Z" fill="#374557" />
                            </svg> Back </Link>
                    </li>
                </ol>
                <div className="row">
                    <div className="col-xl-6 col-xxl-6">
                        <h4 className="d-flex justify-content-between align-items-center">
                            <span className="text-black">
                                <h4 className="d-flex justify-content-between align-items-center">
                                    <span className="text-black">Subscription Plans for You!</span>
                                </h4>
                            </span>
                        </h4>
                        {packageLoading ? user?.length ?
                            <div className="basic-form">
                                <form>
                                    <div className="mb-3 mb-0">
                                        {user?.map((pdata, index) => {
                                            // console.log(pdata, "pdata")
                                            return (
                                                <div className="form-check custom-checkbox mb-2" key={index}>
                                                    <input type="radio" value={pdata} defaultChecked={index === 0}
                                                        onChange={() => redioButton(pdata)} className="form-check-input" id="customRadioBox7" name="pdata" />
                                                    <label className="form-check-label" htmlFor="customRadioBox7" style={{ width: '100%' }}>
                                                        <div className="alert alert-white left-icon-big fade show">
                                                            <div className="media">
                                                                <div className="alert-left-icon-big">
                                                                    <span><i className="mdi mdi-help-circle-outline" /></span>
                                                                </div>
                                                                <div className="media-body">
                                                                    <div className="dlab-info">
                                                                        <div className="dlab-title d-flex justify-content-between">
                                                                            <div className="mt-2">
                                                                                {coursePackage?<h5>
                                                                                    <Link >{coursePackage?.name}
                                                                                    </Link><br />
                                                                                    <p className="mt-2 text-primary"><i className="bi-clipboard" /> {pdata?.SubscriptionPlan?.name} - {pdata.validity} months</p>
                                                                                </h5>:<Skeleton borderRadius={10} highlightColor='#ccccff' height={30} width={350} />}
                                                                            </div>
                                                                            <div className="course_price ml-auto text-primary">
                                                                                <span>₹{coursePackage && coursePackage ? coursePackage?.CourseSubscriptionPlans_course[index]?.discount_price : 0}</span>
                                                                                <br />₹{pdata && pdata ? pdata?.plan_price : 0}
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-2">
                                                                            <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps">
                                                                                <ul className="timeline">
                                                                                    <li>
                                                                                        <div className="timeline-badge info" />
                                                                                        <Link className="timeline-panel text-muted" >
                                                                                            <p className="mb-0">{pdata && pdata ? pdata?.no_of_videos : 0}+ Video Lectures</p>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="timeline-badge success" />
                                                                                        <Link className="timeline-panel text-muted" >
                                                                                            <p className="mb-0">{pdata?.no_of_tests}+ Test Series </p>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div id="DZ_W_TimeLine" className="col-xl-6 col-md-6 widget-timeline dlab-scroll ps ps--active-y">
                                                                                <ul className="timeline">
                                                                                    <li>
                                                                                        <div className="timeline-badge dark" />
                                                                                        <Link className="timeline-panel text-muted" >
                                                                                            <p className="mb-0">{pdata?.no_of_notes}+ PDF Notess</p>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="timeline-badge danger" />
                                                                                        <Link className="timeline-panel text-muted" >
                                                                                            <p className="mb-0">Live Classes-{pdata?.live_classes_access ? "Available" : "Not Available"} </p>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </form>
                            </div> : <div className="alert alert-white text-center mt-5" role="alert">
                                <h5 className='text-danger'>This course Package are unavailable !</h5>
                            </div> :
                            <div className='mt-5'><Loader /></div>}
                    </div>
                    <div className="col-xl-1 col-xxl-1" />

                    <div className="col-xl-5 col-xxl-5 order-lg-2">
                        <h4 className="d-flex justify-content-between align-items-center">
                            <span className="text-black">
                                <h4 className="d-flex justify-content-between align-items-center">
                                    <span className="text-black">Special Offers for You!</span>
                                </h4>
                            </span>
                        </h4>
                        {/* <div className="alert alert-warning alert-dismissible notification alert-alt fade show">
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close" />
                            <p className="notificaiton-title mb-2 text-black">
                                <strong>Flat Rs. 1000 Off !</strong> Only Valid Till 31st October
                            </p>
                            <button className="btn btn-secondary btn-sm">Apply Coupon</button>
                        </div> */}
                        <h4 className="d-flex justify-content-between align-items-center mb-3 mt-4">
                            <span className="text-black">Price Details</span>
                        </h4>

                        <div className="basic-list-group mt-4">

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Course Name </b></span>
                                    {coursePackage?<span className="badge-pill">{coursePackage?.name}</span>:<Skeleton borderRadius={10} highlightColor='#ccccff' height={30} width={350} />}
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span><b>Course Price </b></span>
                                    <span className="badge-pill"><b>₹{subscription?.plan_price}</b></span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Imagnus Discount Offer </span>
                                    <span className="badge-pill text-line-through">₹0</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>Coupon Discount </span>
                                    {isCheck ? <h6 className='text-success'>{applyCoupan?.message}</h6> : ""}
                                    <Link to="" onClick={filterCoupon} className="text-secondary" >{isCheck ? coupanName?.name : "Apply Coupon"} {isCheck ? <i className='bi bi-x-circle-fill'></i> : ""}
                                    </Link>
                                </li>
                                <li className="list-group-item d-flex text-secondary justify-content-between align-items-center">
                                    <span>Your Total Savings</span>
                                    <span>₹{isCheck ? applyCoupan?.coupon_discount : 0}</span>
                                </li>
                                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <strong>Amount to be paid</strong>
                                    <strong>₹{isCheck ? totalPrice : subscription?.plan_price}</strong>
                                </li>
                            </ul><br />
                            {alreadyBuy ? <div className="alert alert-warning" role="alert">
                                You have already parchase this course !
                            </div> : ""}
                            {isCheck ? loading ? <div className="text-center text-primary">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : <button onClick={() => handlePayment(totalPrice, subscription?.id)} className="btn btn-primary btn-xl w-100" disabled={user?.length ? false : true} >Buy Now</button> : loading ? <div className="text-center text-primary">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : <button onClick={() => handlePayment(subscription?.plan_price, subscription?.id)} className="btn btn-primary btn-xl w-100" disabled={user?.length ? false : true}>Buy Now</button>}
                        </div>
                    </div>
                </div>
                <FAQs />
            </div>
            <CouponModel coupanData={coupanData} setIscheck={setIscheck} isCheck={isCheck} ApplyCoupan={ApplyCoupan} setShowCoupanModal={setShowCoupanModal} showCoupanModal={showCoupanModal} />
            <div className={showCoupanModal ? "modal-backdrop fade show" : ""}></div>
        </>
    )
}

export default Package;