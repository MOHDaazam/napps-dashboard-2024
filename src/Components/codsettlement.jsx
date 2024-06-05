import React from 'react'
import "./codsettlement.css"


const Codsettlement = () => {
    return (
        <>

            <main className='content'>

                <div className='cod-items'>
                    <div className='cod'>
                        <i class="bi bi-arrow-left"></i>
                        <h2>COD Settlements</h2>
                        <h3>show all</h3>
                    </div>
                    <div className='settle'>
                        <h4>LEFT TO SETTLE (11)</h4>
                    </div>
                    <hr />
                    <div className='vender-cash'>
                        <h4>Vender cash:<i class="bi bi-currency-rupee"></i>Cash collected:<i class="bi bi-currency-rupee"></i> </h4>
                        <h4>Delivery charges:<i class="bi bi-currency-rupee"></i>Your profit:<i class="bi bi-currency-rupee"></i> </h4>
                    </div>
                    <div className='settled'>
                        <h4>SETTLED(111)</h4>
                    </div>
                    <hr />
                    <div className='vender-cash'>
                        <h4>Vender cash:<i class="bi bi-currency-rupee"></i>Cash collected:<i class="bi bi-currency-rupee"></i> </h4>
                        <h4>Delivery charges:<i class="bi bi-currency-rupee"></i>your profit:<i class="bi bi-currency-rupee"></i> </h4>
                    </div>

                </div>
                <div className='product-card container'>
                    <div className=" switch">
                        <div className="card button">
                            <div className="card-body order-id">
                                <h5 className="card-title">  Order ID-Raj123</h5>
                                <p className="card-text">
                                    23/10/2023 8:30PM
                                </p>
                            </div>
                            <div className='cash'>
                                <p>Matar paneer quarter X 1</p>
                                <h6>CASH</h6>
                            </div>
                            <div className='seller'>
                                <p className='seller-name'>Seller : Rajisthani Dhaba</p>
                                <p><i class="bi bi-currency-rupee"></i>108 Final amount</p>
                                <p><i class="bi bi-currency-rupee"></i>153 Order  amount</p>
                                <p><i class="bi bi-currency-rupee"></i>24 Delivery rate </p>
                                <p><i class="bi bi-currency-rupee"></i>10 Aonla online profit</p>
                            </div>
                            <button type="button" class="btn btn-success">SETTLE</button>
                            <div className='shipping-details'>
                                <h6>Shipping details:</h6>
                                <p>shivam gandhi,</p>
                                <p>Ram lila gate aonla</p>
                            </div>
                        </div>
                    </div>
                    <div className='switch'>
                        <div className="card button">
                            <div className="card-body order-id">
                                <h5 className="card-title">  Order ID-Raj123</h5>
                                <p className="card-text">
                                    23/10/2023 8:30PM
                                </p>
                            </div>
                            <div className='cash'>
                                <p>Matar paneer quarter X 1</p>
                                <h6>CASH</h6>
                            </div>
                            <div className='seller'>
                                <p className='seller-name'>Seller : Rajisthani Dhaba</p>
                                <p><i class="bi bi-currency-rupee"></i>108 Final amount</p>
                                <p><i class="bi bi-currency-rupee"></i>153 Order  amount</p>
                                <p><i class="bi bi-currency-rupee"></i>24 Delivery rate </p>
                                <p><i class="bi bi-currency-rupee"></i>10 Aonla online profit</p>
                            </div>
                            <button type="button" class="btn btn-success">SETTLE</button>
                            <div className='shipping-details'>
                                <h6>Shipping details:</h6>
                                <p>shivam gandhi,</p>
                                <p>Ram lila gate aonla</p>
                            </div>
                        </div>
                    </div>
                    <div className='switch'>
                        <div className="card button">
                            <div className="card-body order-id">
                                <h5 className="card-title">  Order ID-Raj123</h5>
                                <p className="card-text">
                                    23/10/2023 8:30PM
                                </p>
                            </div>
                            <div className='cash'>
                                <p>Matar paneer quarter X 1</p>
                                <h6>CASH</h6>
                            </div>
                            <div className='seller'>
                                <p className='seller-name'>Seller : Rajisthani Dhaba</p>
                                <p><i class="bi bi-currency-rupee"></i>108 Final amount</p>
                                <p><i class="bi bi-currency-rupee"></i>153 Order  amount</p>
                                <p><i class="bi bi-currency-rupee"></i>24 Delivery rate </p>
                                <p><i class="bi bi-currency-rupee"></i>10 Aonla online profit</p>
                            </div>
                            <button type="button" class="btn btn-success">SETTLE</button>
                            <div className='shipping-details'>
                                <h6>Shipping details:</h6>
                                <p>shivam gandhi,</p>
                                <p>Ram lila gate aonla</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}
export default Codsettlement;