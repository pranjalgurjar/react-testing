import React, { useEffect, useState } from 'react'
import { Title, useDocumentTitle } from '../../../coustomhook'
import * as view from "../../view"


const StudyMaterial = (props) => {
    useDocumentTitle(`${Title.documentTitle} | Study Material | ${Title.backTitle}`)

    const { couresPageData } = props
    const [All_prefences, setAll_prefences] = useState()
    const [filterdata, setFilterdata] = useState()
    const [value, setValue] = useState()



    const handleChange = (event, newValue) => {
        setValue(newValue)
        const filter = All_prefences?.find(dt => dt.slug === newValue && dt?.is_active)
        setFilterdata(filter)
    }

    useEffect(() => {
        if (couresPageData) {
            setAll_prefences(couresPageData)
            setFilterdata(couresPageData?.[0])
            setValue(couresPageData?.[0]?.slug)
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
                            tabPannel: filterdata
                        }}
                        Component={view.COURSE_CARD}
                    />
                    <div className="tab-content" id="nav-tabContent">
                        <div className="card mt-4">
                            <div className="card-body mr-2">
                                <h4 className='text-center text-primary '>Coming Soon</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudyMaterial