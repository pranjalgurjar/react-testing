import React, { useEffect, useState } from 'react'
import { Title, useDocumentTitle } from '../../../coustomhook'
import * as view from "../../view"


const StudyMaterial = (props) => {
    useDocumentTitle(`${Title.documentTitle} | Study Material | ${Title.backTitle}`)

    const { couresPageData } = props
    const [All_prefences, setAll_prefences] = useState()
    const [value, setValue] = useState("0")


    const handleChange = (event, newValue) => {
        setValue(newValue)
        event.preventDefault()
    }

    useEffect(() => {
        if (couresPageData) {
            setAll_prefences(couresPageData)
        }
    }, [couresPageData])

    return (
        <>
            <div className="container-fluid">
                <div className="course-details-tab style-2">
                    <view.SCROLL_TABS
                        handleChange={handleChange}
                        value={value}
                        data={{
                            tabs: All_prefences,
                        }}
                        Component={view.COMING_SOON}
                    />
                </div>
            </div>
        </>
    )
}

export default StudyMaterial