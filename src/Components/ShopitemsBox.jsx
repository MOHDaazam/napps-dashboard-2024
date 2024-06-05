import React, { useState } from "react";
import "./ShopitemsBox.css"
import Form from 'react-bootstrap/Form';
import ExtralargeModal from "./ExtralargeModal";
import { Link, useLocation } from "react-router-dom";

const ShopitemsBox =  (id) => {

    const [yunus, setYunus] = useState(false);


    const handleClick = () => {
        setYunus(!yunus)
    };
    const location = useLocation();
    console.log(location.state);

    return (
        <>
            <ExtralargeModal status={yunus} handleClick={handleClick} />
            <div className="add-button">
                <button onClick={handleClick}> <i class="bi bi-plus"></i></button><span>ADD</span>
            </div>
            {/* <h4>{location.state.ClientShopName}</h4> */}
            <div className="product-card container">
                <div className=" switch">
                    <div className="card">
                        <img src="assets/images/maggie.jpg" style={{ margintop: '40px;' }} className="card-img-top" alt="..." />
                        <div className="card-body">

                            <h5 className="card-title">Maggie Full </h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                        </div>
                        <div className="d-flex justify-content-between card-padding-1">
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    className="shop-custom-switch"
                                />
                            </Form>
                            <div className="add-items" >
                                <i class="bi bi-pencil-square"
                                    onClick={handleClick}
                                ></i>
                                <i class="bi bi-trash"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" switch">
                    <div className="card">

                        <img src="assets/images/maggie.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Maggie Full</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                        </div>
                        <div className="d-flex justify-content-between card-padding-1">
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    className="shop-custom-switch"
                                />
                            </Form>
                            <div className="add-items">
                                <i class="bi bi-pencil-square"
                                    onClick={handleClick}  ></i>
                                <i class="bi bi-trash"></i>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="switch">

                    <div className="card">

                        <img src="assets/images/maggie.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Maggie Full</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                        </div>
                        <div className="d-flex justify-content-between card-padding-1">
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    className="shop-custom-switch"
                                />
                            </Form>
                            <div className="add-items">
                                <i class="bi bi-pencil-square"
                                    onClick={handleClick}  >
                                </i>
                                <i class="bi bi-trash"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default ShopitemsBox;