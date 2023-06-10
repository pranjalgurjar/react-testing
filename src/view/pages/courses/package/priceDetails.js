import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

const PriceDetails = (props) => {
	const {
		coursePackage,
		subscription,
		filterCoupon,
		isCheck,
		applyCoupan,
		coupanName,
		totalPrice,
		alreadyBuy,
		loading,
		handlePayment,
		user
	} = props
	return (
		<div className="basic-list-group mt-4">

			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between align-items-center">
					<span><b>Course Name </b></span>
					{coursePackage ? <span className="badge-pill">{coursePackage?.name}</span> : <Skeleton borderRadius={10} highlightColor='#ccccff' height={30} width={300} />}
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
	)
}

export default PriceDetails
