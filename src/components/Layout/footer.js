import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (<>
        <div className="footer">
            <div className="copyright">
                <p>Copyright © by <Link>I-Magnus</Link> 2023</p>
            </div>
        </div>
    </>)
}

export default Footer;
