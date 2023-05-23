import React from 'react'
const ReferEarn = () => {

    return (
        <>
            <div className="container-fluid pt-0">
                <div className="card h-auto">
                    <div className="row p-4">
                        <div className="col-xs-12 col-sm-6">
                            <h1 className="mt-4 mb-sm-6 c-bw-12 p-4">Refer a friend, get 1 month free</h1>
                            <div className="p-4">
                                <div className="Text fwm c-bw-12">
                                    <div>
                                        <ul className="List base d-inline-block text-left mb-5 mb-sm-6">
                                            <li className="ListItem">
                                                <p className="Text fwm d-inline">The more friends you refer, the more months you get!</p>
                                            </li>
                                            <li className="ListItem">
                                                <p className="Text fwm d-inline">Your friend also gets 1 free month.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="HeroLeftV4__Button-container flex-row-reverse justify-content-end d-sm-inline-block">
                                <a className="Button inline-vertical-middle Button--primary Button--block-xs HeroLeftV4__Button" href="https://my.nordaccount.com/referral/" data-ga-slug="Refer a Friend" aria-label="Refer a Friend" role="button" tabIndex={0}>Refer a Friend</a>
                            </div>
                            <div className="p-4">
                                <div>
                                    <span className="Text micro d-inline-flex align-items-center c-bw-12">
                                        <span>
                                            <div>
                                                <span className="Text micro d-inline-flex c-bw-12 text-sm-left mx-6 mx-sm-0">
                                                    <div className="SVG-wrapper mt-1 mr-0 mr-sm-3 d-inline-block" style={{ width: '16px', height: '16px', minWidth: '16px' }}>
                                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" id className="Graphic-SVG SVG SVG--inline d-inline-block js-Graphic-SVG--no-responsive" preserveAspectRatio="xMidYMid meet">
                                                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#151922" />
                                                        </svg>
                                                    </div>
                                                    <span> Note: The referral program works on <a className="Link Link--alt" href="https://my.nordaccount.com/referral/" data-ga-slug="nord account">Nord Account</a>. It also works on the NordVPN app for Android, Windows, and Mac. </span>
                                                </span>
                                            </div>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 relative pt-7 pt-sm-0">
                            <div className="relative center-block img-responsive" style={{ maxHeight: '555px', maxWidth: '555px' }}>
                                <img src="https://o.remove.bg/downloads/15dc3787-b2d9-4391-afac-a79077f415d0/58749d52d617d8e522880dc6bf54e279-removebg-preview.png" alt='' height={450} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReferEarn;