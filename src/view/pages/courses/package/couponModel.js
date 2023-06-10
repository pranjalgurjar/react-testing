import React, { useState } from 'react'
import { Link } from "react-router-dom"

const CouponModel = (props) => {
	const { coupanData, setIscheck, ApplyCoupan, setShowCoupanModal, showCoupanModal } = props
	const [coupanId, setCoupanId] = useState([])
	// for calculate total price 
	const totalPrice = (item) => {
		ApplyCoupan(item)
		setIscheck(true)
		setCoupanId([item.id])
		setShowCoupanModal(false)
	}

	// for remove coupan
	const RemoveCop = () => {
		setCoupanId([])
		setIscheck(false)
	}

	return (
		<div className={showCoupanModal ? "modal fade bd-example-modal-lg show" : "modal fade bd-example-modal-lg"} tabIndex={-1} style={showCoupanModal ? { display: "block", paddingRight: "17px" } : { display: "none" }} >
			<div className="modal-dialog modal-md">
				<div className="modal-content">
					<div className="card-header d-flex d-block">
						<h4 className="modal-title text-primary">Coupan Code</h4>
						<button type="button" className="btn-close" onClick={() => setShowCoupanModal(false)} >
						</button>
					</div>
					<h4 className="background-warning text-center">{coupanData && coupanData.length ? "Available Coupons" : "No Coupons Available"}</h4>
					<div className="modal-body scrollspy h-auto">
						<div id="en-instruction" style={{ display: 'block' }}>
							<div className="input-group search-area mb-2">
								<input type="text" className="form-control" placeholder="enter coupon code..." />
								<span className="input-group-text btn btn-primary bg-primary">
									<Link className="text-white">
										apply coupon
									</Link></span>
							</div>
							{(coupanData && coupanData.length ? coupanData : [])?.map((item, index) => <div key={index}><div className="ft-b mt-4" >
								<p className="notificaiton-title mb-2 text-black">
									<strong>{item?.discription}</strong>
								</p>
								<div className="d-flex justify-content-between content align-items-center">
									<button className="alert alert-warning alert-dismissible notification alert-alt fade show">Coupon Code : {item?.name}</button>
									{coupanId?.[0] === item.id ? <button className="btn btn-danger btn-sm" onClick={RemoveCop}>Remove Coupon</button> : <button className="btn btn-secondary btn-sm" onClick={() => totalPrice(item)}>Apply Coupon</button>}
								</div>

							</div>
								<hr />
							</div>
							)}
							{/* <div className="ft-b mt-4">
								<p className="notificaiton-title mb-2 text-black">
									<strong>Flat Rs. 1000 Off !</strong> Only Valid Till 31st October
								</p>
								<div className="d-flex justify-content-between content align-items-center">
									<button className="alert alert-warning alert-dismissible notification alert-alt fade show">Coupon Code :
										IMAGNUS100</button>
									<button className="btn btn-secondary btn-sm">Apply Coupon</button>
								</div>
							</div>
							<hr /> */}
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger light" onClick={() => setShowCoupanModal(false)}>Close</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CouponModel;
