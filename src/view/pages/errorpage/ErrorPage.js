import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, useDocumentTitle } from '../../../coustomhook';

function ErrorPage(props) {
    const navigate = useNavigate()
    useDocumentTitle(`${Title.documentTitle} | Not Found`)
    return (
        <div style={{textAlign: "center" }}>
            <div style={{ height: "auto", minHeight: "100%" }}>
                <div style={{textAlign: "center",marginTop:"5%" }}>
                    <h1 style={{ margin: 0, fontSize: 150, fontWeight: "bold" }}> 404</h1>
                    <h2 style={{ marginTop: 15, fontSize: 30 }}>Not Found</h2>
                    <p>The resource requested could not be found on this server!</p>
                </div>
            </div>

            <button onClick={() => navigate("/")} style={{ background: "black", border: "none", color: "#fff", padding: "12px", marginTop: "20px" }}>GO TO HOME PAGE</button>
        </div>
    );
}

export default ErrorPage;