import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosClient from "../../../../webServices/webservice"
import { Tokens } from '../../../../App'
import { ProtectUrl } from '../../../../utils'
import { webUrls } from '../../../../webServices/webUrls'
import * as view from "../../../view"
import { COURSES } from '../../../../route/route'

const LivePanel = () => {

	const { lslug } = useParams()
	const navigate = useNavigate()
	const token = useContext(Tokens)
	const liveClasses = JSON.parse(sessionStorage.getItem("li_ve"))
	const [live_video, setLive_video] = useState([])
	const [playlist, setPlaylist] = useState()


	const livepanel = useCallback(async (slug) => {
		if (ProtectUrl(slug)) {
			try {
				let response = await axiosClient.get(`${webUrls.GET_LIVE_CLASSES_URL}/${slug}/`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				})
				if (response.status === 200) {
					setLive_video(response.data)
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			navigate(`/${COURSES}/${slug}`)
		}
	}, [token, navigate])


	useEffect(() => {
		if (token) {
			livepanel(lslug)
		}
	}, [livepanel, lslug, token])

	return (
		<>
			<div className="container-fluid">
				<div className="row page-titles">
					<ol className="breadcrumb">
					<view.BACK_KEY path={null} /> -
						<li className="breadcrumb-item active">{liveClasses?.course?.name}</li>
						<li className="breadcrumb-item">{(playlist && playlist.id) ? playlist?.title : liveClasses?.title}</li>
					</ol>
					
				</div>
				<div className="row">
					<div className="col-xl-8 col-xxl-8">
						<div className="card h-auto">
							<div className="card-body">
								<div className="live-img position-relative">
									<iframe width="100%" height="485" src={(playlist && playlist.id) ? playlist?.url?.replace('watch?v=', 'embed/') : liveClasses?.url?.replace('watch?v=', 'embed/')} title={(playlist && playlist.id) ? playlist?.title : liveClasses?.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
									<div className="live-tag">
										<svg className="me-2" width={8} height={9} viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
											<circle cx={4} cy="4.5" r={4} fill="#FC6B57" />
										</svg>
										Live
									</div>
									<div className="row mt-4">
										<div className="col-md-10 col-lg-10">
											<h4>{(playlist && playlist.id) ? playlist?.title : liveClasses?.title}</h4>
										</div>
										<div className="col-md-2 col-lg-2">
											<div className="pagination-down mt-4">
												<div className="d-flex align-items-center justify-content-right">
													<ul>
														<li className="ml-2"><a href={(playlist && playlist.id) ? playlist?.url : liveClasses?.url} className=""><i className="bi bi-chat-right-text" /> </a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>
									<div className="row user-pic2">
										<div className="col-lg-1 col-md-1">
											<img src="https://toppng.com//public/uploads/preview/man-icon-icon-11553432006itw46zhhk8.png" alt='' />
											{/* <img src={(playlist && playlist.id) ? playlist?.instructor.image_url : liveClasses?.instructor?.image_url} alt="" /> */}
										</div>
										<div className="col-lg-8 col-md-8">
											<small>Faculty By:</small>
											<h4>{(playlist && playlist.id) ? playlist?.instructor?.name : liveClasses?.instructor?.name}</h4>
										</div>

									</div>
								</div>

							</div>
						</div>
					</div>
					<div className="col-xl-4 col-xxl-4">
						<div className="row">
							<div className="col-xl-12 col-lg-6">
								<div className="card">
									<div className="card-body py-2">
										<div className="custome-accordion style-1">
											<div className="" id="accordionExample">
												<div className="accordion-item">
													<h4 className="accordion-header border-0 mb-2 mt-2" id="headingOne">
														{/* <button className="accordion-button  mt-1 d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
															<span className="acc-heading">Other  live Classes</span>
														</button> */}
														<b>Other  live Classes</b>
													</h4>
													<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
														{live_video.length && live_video?.map((item, index) => <div className="accordion-body card-body p-0" key={index}>
															<div className="acc-courses">
																<div className="d-flex justify-content-between align-items-center">
																	<div className="d-flex align-items-center">
																		<span className="acc-icon">
																			<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																				<path d="M4 13C3.817 13 3.635 12.95 3.474 12.851C3.32918 12.7611 3.20965 12.6358 3.12671 12.4869C3.04378 12.338 3.00016 12.1704 3 12V4C3 3.653 3.18 3.331 3.474 3.149C3.61914 3.05976 3.7846 3.00891 3.95481 3.00121C4.12502 2.99351 4.29439 3.02923 4.447 3.105L12.447 7.105C12.6131 7.1882 12.7528 7.31599 12.8504 7.47405C12.948 7.63212 12.9997 7.81423 12.9997 8C12.9997 8.18578 12.948 8.36789 12.8504 8.52595C12.7528 8.68402 12.6131 8.8118 12.447 8.895L4.447 12.895C4.307 12.965 4.152 13 4 13Z" fill="#fff" />
																			</svg>
																		</span>
																		<h4 className="m-0" onClick={() => setPlaylist(item)}>{item?.title}</h4>
																	</div>

																</div>
															</div>


														</div>)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* <div className="col-xl-12 col-lg-6">
								<div className="card h-auto">
									<div className="card-header mb-0 mt-0 pb-0">
										<h4>Live Chat</h4>
									</div>
									<div className="card-body pt-0">
										<div className="chat-box-area dlab-scroll style-1 ps" id="chartBox2">
											<div className="media my-2">
												<div className="message-received w-auto">
													<h4 className="fs-16 font-w600">iMagnus</h4>
													<p className="mb-1">
														Lorem ipsum dolor sit amet ut labore et
													</p>
													<span className="fs-14">12:45 PM</span>
												</div>
											</div>
											<div className="media mb-4 justify-content-end align-items-end">
												<div className="message-sent w-auto">
													<h4 className="fs-16 font-w600">Student Name</h4>
													<p className="mb-1">
														Lorem ipsum dolor sit amet ut labore et
													</p>
													<span className="fs-12">9.30 AM</span>
												</div>
											</div>
											<div className="media my-2">
												<div className="message-received w-auto">
													<h4 className="fs-16 font-w600">iMagnus</h4>
													<p className="mb-1">
														Lorem ipsum dolor sit amet ut labore et
													</p>
													<span className="fs-14">12:45 PM</span>
												</div>
											</div>
											<div className="media mb-4 justify-content-end align-items-end">
												<div className="message-sent w-auto">
													<h4 className="fs-16 font-w600">Student Name</h4>
													<p className="mb-1">
														Lorem ipsum dolor sit amet ut labore et
													</p>
													<span className="fs-12">9.30 AM</span>
												</div>
											</div>
											<div className="media my-2">
												<div className="message-received w-auto">
													<h4 className="fs-16 font-w600">iMagnus</h4>
													<p className="mb-1">
														Lorem ipsum dolor sit amet ut labore et
													</p>
													<span className="fs-14">12:45 PM</span>
												</div>
											</div>
											<div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}>
												<div className="ps__thumb-x" tabIndex={0} style={{ left: '0px', width: '0px' }}>
												</div>
											</div>
											<div className="ps__rail-y" style={{ top: '0px', right: '0px' }}>
												<div className="ps__thumb-y" tabIndex={0} style={{ top: '0px', height: '0px' }}>
												</div>
											</div>
										</div>
										<div className="type-massage style-1">
											<div className="input-group">
												<textarea className="form-control" placeholder="Hello Hanuman..." defaultValue={""} />
												<form>
													<div className="input-group-append">
														<button type="button" className="btn p-2" id="fileUpload">
															<svg width={25} height={25} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M14.3251 34.2002C13.0909 34.1974 11.8852 33.8294 10.86 33.1424C9.83471 32.4555 9.03576 31.4804 8.56385 30.3401C8.09194 29.1997 7.96819 27.9452 8.20821 26.7346C8.44823 25.5241 9.04126 24.4117 9.91256 23.5377L20.5126 12.9252C20.8614 12.5763 21.2755 12.2996 21.7313 12.1108C22.187 11.9221 22.6755 11.8249 23.1688 11.8249C23.6621 11.8249 24.1506 11.9221 24.6064 12.1108C25.0621 12.2996 25.4762 12.5763 25.8251 12.9252C26.1739 13.274 26.4506 13.6881 26.6394 14.1439C26.8282 14.5996 26.9253 15.0881 26.9253 15.5814C26.9253 16.0747 26.8282 16.5632 26.6394 17.019C26.4506 17.4747 26.1739 17.8888 25.8251 18.2377L15.2126 28.8377C15.1005 28.9685 14.9626 29.0748 14.8075 29.1498C14.6524 29.2248 14.4835 29.267 14.3114 29.2736C14.1392 29.2803 13.9676 29.2513 13.8072 29.1884C13.6468 29.1256 13.5011 29.0303 13.3792 28.9085C13.2574 28.7866 13.1621 28.641 13.0993 28.4806C13.0364 28.3201 13.0074 28.1485 13.0141 27.9763C13.0207 27.8042 13.0629 27.6353 13.1379 27.4802C13.2129 27.3251 13.3192 27.1872 13.4501 27.0752L24.0501 16.4627C24.2548 16.2235 24.3619 15.9159 24.3497 15.6013C24.3375 15.2867 24.2071 14.9883 23.9845 14.7657C23.7619 14.5431 23.4635 14.4127 23.1489 14.4005C22.8343 14.3884 22.5267 14.4954 22.2876 14.7002L11.6751 25.3002C10.9706 26.0046 10.5748 26.9601 10.5748 27.9564C10.5748 28.9527 10.9706 29.9082 11.6751 30.6127C12.3795 31.3171 13.335 31.7129 14.3313 31.7129C15.3276 31.7129 16.2831 31.3171 16.9876 30.6127L27.5876 20.0002C28.726 18.8214 29.356 17.2426 29.3418 15.6039C29.3275 13.9652 28.6702 12.3976 27.5114 11.2388C26.3526 10.08 24.785 9.42268 23.1463 9.40844C21.5076 9.3942 19.9288 10.0242 18.7501 11.1627L12.5626 17.4127C12.3284 17.6455 12.0115 17.7761 11.6813 17.7761C11.3511 17.7761 11.0343 17.6455 10.8001 17.4127C10.6829 17.2964 10.5899 17.1582 10.5264 17.0059C10.463 16.8535 10.4303 16.6902 10.4303 16.5252C10.4303 16.3601 10.463 16.1968 10.5264 16.0444C10.5899 15.8921 10.6829 15.7539 10.8001 15.6377L16.9876 9.38765C18.6286 7.74663 20.8543 6.82471 23.1751 6.82471C25.4958 6.82471 27.7215 7.74663 29.3626 9.38765C31.0036 11.0287 31.9255 13.2544 31.9255 15.5752C31.9255 17.8959 31.0036 20.1216 29.3626 21.7627L18.7501 32.3752C18.1686 32.9552 17.4785 33.4149 16.7192 33.728C15.9599 34.0412 15.1464 34.2016 14.3251 34.2002Z" fill="#A098AE" />
															</svg>
														</button>
														<button type="button" className="btn btn-primary p-2">
															<svg className="ms-1" width={16} height={16} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M3.58106 13.6267L10.5819 12.2265C11.2071 12.1016 11.2071 11.8984 10.5819 11.7735L3.58106 10.3732C3.16406 10.29 2.75793 9.88348 2.67468 9.46686L1.27443 2.46599C1.14918 1.84049 1.51781 1.54986 2.09718 1.81724L23.4606 11.6771C23.8464 11.8552 23.8464 12.1447 23.4606 12.3229L2.09718 22.1827C1.51781 22.4501 1.14918 22.1595 1.27443 21.534L2.67468 14.5331C2.75793 14.1165 3.16406 13.71 3.58106 13.6267Z" fill="white" />
															</svg>
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LivePanel
