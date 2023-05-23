import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage(props) {
    const navigate = useNavigate()
    return (
        <div>
            <button onClick={() => navigate("/")} style={{ background: "black", border: "none", color: "#fff", padding: "12px", marginTop: "20px" }}>GO TO HOME PAGE</button>
        </div>
    );
}

export default ErrorPage;