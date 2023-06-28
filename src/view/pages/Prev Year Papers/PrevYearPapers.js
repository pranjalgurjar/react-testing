import React from 'react'
import { Title, useDocumentTitle } from '../../../coustomhook';
import { useState } from 'react';
import { useEffect } from 'react';
import * as view from "../../view"

const PrevYearPapers = (props) => {
    useDocumentTitle(`${Title.documentTitle} | PrevYearPapers | ${Title.backTitle}`)

    const { couresPageData } = props
    const [Tabs, setTabs] = useState()
    const [value, setValue] = useState("0")

    function handleChange(event, newValue) {
        setValue(newValue)
        event.preventDefault()
    }

    useEffect(() => {
        if (couresPageData) {
            setTabs(couresPageData)
        }
    }, [couresPageData])
    return (
        <>
            <div className="container-fluid">
                <div className="course-details-tab style-2">
                    <view.SCROLL_TABS
                        handleChange={handleChange}
                        value={value}
                        data={{ tabs: Tabs }}
                        Component={view.COMING_SOON}
                    />
                </div>
            </div>
        </>
    )
}

export default PrevYearPapers;
