import { useState } from 'react';
import React from 'react'
import "./notifypopup.css";


const Notifypopup = (props) => {

    console.log(props, "hello youns");
    return (
        <>
            <div className='main'>
                {props.NotificationsData.map((item, index) => (
                    <div className='message-button'>
                        <p><b>{item.title}</b></p>
                        <p>{item.notificationMsg}</p>
                        <button onClick={(e)=> {props.setTitleAndMsg(item.title, item.notificationMsg); props.modalClose()}  } type="button" class="message">Select</button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Notifypopup;