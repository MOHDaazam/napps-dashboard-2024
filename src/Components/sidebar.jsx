import React from "react";
import { Link } from "react-router-dom";



const sidebar = () => {
    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="index.html">
                            <i className="bi bi-grid" />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    {/* End Dashboard Nav */}
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${window.location.href.includes('cod-settlement') && "collapsed"}`}
                            to="/cod-settlement"
                        >
                            <i className="bi bi-menu-button-wide" />
                            <span>COD Settlements</span>

                        </Link>
                    </li>
                    {/* End Components Nav */}
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${window.location.href.includes('accordion') && "collapsed"}`}
                            to="/accordion"
                        >
                            <i className="bi bi-journal-text" />
                            <span>Shops</span>
                            
                        </Link>
                    </li>
                    {/* End Forms Nav */}
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${window.location.href.includes('notification') && "collapsed"}`}
                            to="/notification"
                        >
                            <i className="bi bi-layout-text-window-reverse" />
                            <span>Notifications</span>
                            
                        </Link>

                    </li>
                    {/* End Tables Nav */}
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${window.location.href.includes('shophandler') && "collapsed"}`}
                            to="/shophandler"
                        >
                            <i className="bi bi-bar-chart" />
                            <span>Shop Handler</span>
                            
                        </Link>

                    </li>
                    {/* End Charts Nav */}
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${window.location.href.includes('cod-settlement') && "collapsed"}`}
                            to="/cod-settlement"
                        >
                            <i className="bi bi-gem" />
                            <span>Shop Items</span>
                            
                        </Link>

                    </li>
                    {/* End Icons Nav */}
                    <li className="nav-heading">Pages</li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="users-profile.html">
                            <i className="bi bi-person" />
                            <span>Profile</span>
                        </a>
                    </li>
                    {/* End Profile Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-faq.html">
                            <i className="bi bi-question-circle" />
                            <span>F.A.Q</span>
                        </a>
                    </li>
                    {/* End F.A.Q Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-contact.html">
                            <i className="bi bi-envelope" />
                            <span>Contact</span>
                        </a>
                    </li>
                    {/* End Contact Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-register.html">
                            <i className="bi bi-card-list" />
                            <span>Register</span>
                        </a>
                    </li>
                    {/* End Register Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-login.html">
                            <i className="bi bi-box-arrow-in-right" />
                            <span>Login</span>
                        </a>
                    </li>
                    {/* End Login Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-error-404.html">
                            <i className="bi bi-dash-circle" />
                            <span>Error 404</span>
                        </a>
                    </li>
                    {/* End Error 404 Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-blank.html">
                            <i className="bi bi-file-earmark" />
                            <span>Blank</span>
                        </a>
                    </li>
                </ul>
            </aside >


        </>
    )
}

export default sidebar;