import { useEffect, useState } from "react"
import { Title, useDocumentTitle } from "../../../coustomhook"
import * as view from "../../view"


const Courses = (props) => {
    useDocumentTitle(`${Title.documentTitle} | Courses | ${Title.backTitle}`)
    const { couresPageData } = props
    const [All_prefences, setAll_prefences] = useState()
    const [filterdata, setFilterdata] = useState()
    const [value, setValue] = useState('0')
    // console.log(filterdata);

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setFilterdata(couresPageData?.[newValue])
        event.preventDefault()
    }

    useEffect(() => {
        if (couresPageData) {
            setAll_prefences(couresPageData)
            setFilterdata(couresPageData?.[0])
        }
    }, [couresPageData])


    return (<>
        {(All_prefences && All_prefences?.length) ? <>
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
                </div>
            </div></> : <div className="container-fluid">
            <view.LOADER />
        </div>}
    </>)
}

export default Courses