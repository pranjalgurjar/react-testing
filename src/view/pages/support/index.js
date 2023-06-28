import React, { useState } from 'react'
import { Title, useDocumentTitle } from '../../../coustomhook'
import * as view from "../../view"
import * as contact from "./contact"
import * as Disclaimer from "./Disclaimer"
import * as Term from "./terms&conditions"
import * as PrivacyPolicy from "./privacy_policy"
const Support = () => {
    useDocumentTitle(`${Title.documentTitle} | Support | ${Title.backTitle}`)

    const [value, setValue] = useState("0")
    const [component, setComponent] = useState(contact)

    const Tabs = [
        { name: "Contact", index: "0" },
        { name: "Privacy", index: "1" },
        { name: "Terms", index: "2" },
        { name: "Disclaimer", index: "3" }
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue)
        let comp = Tabs.find(item => item.index === newValue)
        switch (comp.name) {
            case "Contact": setComponent(contact)
                break;
            case "Privacy": setComponent(PrivacyPolicy)
                break;
            case "Terms": setComponent(Term)
                break;
            case "Disclaimer": setComponent(Disclaimer)
                break;
            default: setComponent(contact)
                break;
        }
        event.preventDefault()
    }


    return (
        <>
            <div className="container-fluid">
                <div className="course-details-tab style-2">
                    <view.SCROLL_TABS
                        handleChange={handleChange}
                        data={{ tabs: Tabs }}
                        value={value}
                        Component={component.default}
                    />
                    {/* <nav>
                        <div className="nav nav-tabs justify-content-start tab-auto" id="nav-tab" role="tablist">
                            <button className={tab1 ? "nav-link active" : "nav-link"} id="nav-about-tab" onClick={() => tabs("Contact")} >Contact Us</button>
                            <button className={tab2 ? "nav-link active" : "nav-link"} id="nav-privacy-tab" onClick={() => tabs("Privacy")} >Privacy Policy</button>
                            <button className={tab3 ? "nav-link active" : "nav-link"} id="nav-terms-tab" onClick={() => tabs("Terms")} >Terms &amp; Conditions</button>
                            <button className={tab4 ? "nav-link active" : "nav-link"} id="nav-disclaimer-tab" onClick={() => tabs("Disclaimer")} >Disclaimer</button>
                        </div>
                    </nav> */}
                    {/* <div className="tab-content" id="nav-tabContent">
                        <div className={tab1 ? "tab-pane active show" : "tab-pane"} id="nav-about" >
                           
                        </div>
                        <div className={tab2 ? "tab-pane active show" : "tab-pane"} id="nav-disclaimer" >
                            
                        </div>
                        <div className={tab3 ? "tab-pane active show" : "tab-pane"} id="nav-privacy" >
                            
                        </div>
                        <div className={tab4 ? "tab-pane active show" : "tab-pane"} id="nav-terms" >
                            
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Support;