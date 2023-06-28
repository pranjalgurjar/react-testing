import React from 'react'

const Contact = () => {
	return (
		<div className="card all-crs-wid h-auto mt-4">
			<div className="card-body">
				<div className="row align-items-center">
					<div className="col-xl-1 col-md-4 col-sm-6 p-4" />
					<div className="col-xl-2 col-md-4 col-sm-6 p-4">
						<div className="icon-bx-wraper left">
							<div className="icon-content">
								<h5> Contact us:</h5>
								<h6>
									<a href="tel:9344906848" className="text-primary float"> Toll Free: 9344906848 </a>
									<br />support@imagnus.in
								</h6>
							</div>
						</div>
					</div>
					<div className="col-xl-2 col-md-4 col-sm-6 p-4">
						<div className="icon-bx-wraper left">
							<div className="icon-content">
								<h5> For Technical Support: </h5>
								<h6> <a href="https://api.whatsapp.com/send?phone=+917676331013" className="float" method="get">
									<i className="fa fa-whatsapp my-float" /> +91 7676331013 </a>
									<br />(Whatsapp Only)</h6>
							</div>
						</div>
					</div>
					<div className="col-xl-7 col-md-4 col-sm-6">
						<img src="https://bharatcorporation.co.in/wp-content/uploads/2021/05/contact-header-mobile.png" style={{ width: '100%' }} alt="" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contact;
