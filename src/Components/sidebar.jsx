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
                        <Link className="nav-link collapsed" to='/whatsapp-message'>
                            <i className="bi bi-file-earmark" />
                            <span>Create/View Messages</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/whatsapp-data-file'>
                            <i className="bi bi-file-earmark" />
                            <span>Upload Customers</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/whatsapp-qr-code-login'>
                            <i className="bi bi-file-earmark" />
                            <span>QR Code Login</span>
                        </Link>
                    </li>

                    <label>Aonla Online</label>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-ongoing-orders'>
                            <i className="bi bi-file-earmark" />
                            <span>On Going Orders</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-add-shop'>
                            <i className="bi bi-file-earmark" />
                            <span>Add Shop</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-add-vehicle'>
                            <i className="bi bi-file-earmark" />
                            <span>Add Vehicle</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-shop-auto'>
                            <i className="bi bi-file-earmark" />
                            <span>Add/Remove shop from Auto opener</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-vehicle-service'>
                            <i className="bi bi-file-earmark" />
                            <span>Add Vehicles</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-refund-wallet'>
                            <i className="bi bi-file-earmark" />
                            <span>Refund Wallet Amount</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-current-orders'>
                            <i className="bi bi-file-earmark" />
                            <span>Current Orders</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-manage-products'>
                            <i className="bi bi-file-earmark" />
                            <span>Manage Products</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-Offline-Menu'>
                            <i className="bi bi-file-earmark" />
                            <span>Offline Menu</span>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online-Cron-Jobs'>
                            <i className="bi bi-file-earmark" />
                            <span>Cron Jobs</span>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to='/aonla-online- Google-Analytics'>
                            <i className="bi bi-file-earmark" />
                            <span> Google Analytics</span>
                        </Link>
                        
                    </li>
                </ul>
            </aside >


        </>
    )
}

export default sidebar;