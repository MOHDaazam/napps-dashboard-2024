import React from "react";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import "./shophandler.css";
import { useNavigate } from "react-router-dom";




const Shophandler = () => {
    const shophandlerData = [
        {
            shopName: "Aarav fast food",
            acceptingOrders: "yes",

        },
        {
            shopName: "gupta fast food",
            acceptingOrders: "yes",

        },
        {
            shopName: "Meerut fast food",
            acceptingOrders: "yes",

        },
        {
            shopName: "Prince fast food",
            acceptingOrders: "yes",
        },
        {
            shopName: "Shiv pizza point",
            acceptingOrders: "yes",
        },
        {
            shopName: "SS everday pizza",
            acceptingOrders: "yes",
        },
        {
            shopName: "Diamond pizza",
            acceptingOrders: "yes",
        },
        {
            shopName: "cash and curry resturant ",
            acceptingOrders: "yes"
        }
    ]
    const Navigate = useNavigate();

    function shopmenu(name) {
        console.log(name, "shopname");
        Navigate('/Shop-menu', { state: { ClientShopName: name } })
    }


    const rendercard = (card, index) => {
        return (
            <Card style={{ width: '18rem' }} key={index} className="box" >
                <div className="card-heading">
                    <h3>{card.shopName}</h3>
                </div>
                <Card.Body>
                    <div className="changedeliver">
                        <button>Change delivery to aonla online</button>
                    </div>
                    <div className="deliveryorder ">
                        <button>Delivery order and settlements</button>
                    </div>
                    <div className="shopmenu">
                        <button onClick={(e) => (shopmenu(card.shopName))} >Shop Menu</button>
                    </div>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            className="shop-custom-switch toggle"
                        />
                    </Form>
                    <shophandlerData shophandlerData={shophandlerData} />
                </Card.Body>
            </Card>
        )
    }

    return (

        <>
            <main className="content grid">
                {shophandlerData.map(rendercard)}

            </main>
        </>
    )
}

export default Shophandler;