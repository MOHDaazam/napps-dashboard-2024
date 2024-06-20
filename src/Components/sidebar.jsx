import React from "react";
import { Link } from "react-router-dom";



const sidebar = () => {
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <label>WhatsApp</label>
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/whatsapp-send'>
                            <i className="bi bi-file-earmark" />
                            <span>Create & Start Campaign</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/whatsapp-data-file'>
                            <i className="bi bi-file-earmark" />
                            <span>Upload Customers</span>
                        </Link>
                    </li>
                </ul>
            </aside >


        </>
    )
}

export default sidebar;