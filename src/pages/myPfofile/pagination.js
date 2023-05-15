import React from 'react'
import { Link } from 'react-router-dom'
const Pagination = (props) => {
    const { currentPage, setCurrentPage, incrementPageNumber, decrementPageNumber, pageNumbers } = props
    return (
        <div className="dataTables_paginate paging_simple_numbers" id="example3_paginate">
            <Link className="paginate_button previous disabled" disabled={currentPage === 0} onClick={() => { setCurrentPage(0) }} aria-controls="example3" data-dt-idx="0" tabIndex="0" id="example3_previous">
                <i className="	fa fa-angle-left" aria-hidden="true">
                </i>
            </Link>
            <Link className="paginate_button previous disabled" onClick={decrementPageNumber} disabled={currentPage === 0} aria-controls="example3" data-dt-idx="0" tabIndex="0" id="example3_previous">
                <i className="fa fa-angle-double-left" aria-hidden="true">
                </i>
            </Link>
            <span>
                <Link className="paginate_button current" aria-controls="example3" data-dt-idx="1" tabIndex="0">{currentPage + 1}</Link>
            </span>
            <Link className="paginate_button previous disabled" onClick={incrementPageNumber} disabled={currentPage === pageNumbers[pageNumbers.length - 1]} aria-controls="example3" data-dt-idx="0" tabIndex="0" id="example3_previous">
                <i className="fa fa-angle-double-right" aria-hidden="true">
                </i>
            </Link>
            <Link className="paginate_button previous disabled" disabled={currentPage === 0} onClick={() => setCurrentPage(pageNumbers[pageNumbers.length - 1])} aria-controls="example3" data-dt-idx="0" tabIndex="0" id="example3_previous">
                <i className="fa fa-angle-right" aria-hidden="true">
                </i>
            </Link>
        </div>
    )
}

export default Pagination