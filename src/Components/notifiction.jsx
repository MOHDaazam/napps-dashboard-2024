import React, { useState } from 'react'
import "./notifiction.css"
import Notifypopup from './notifypopup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Notifiction = (props) => 
    
    {
        
        // my script start here

    const [modalShow, setModalShow] = React.useState(false);

    const modalClose = () => {
        console.log("hello modal close");
        setModalShow(false);
    }

    const NotificationsData = [
        {
            title: "Hello how are you today",
            notificationMsg: "What are wating for let order some food",
        },
        {
            title: "Hello how are you today",
            notificationMsg: "What are wating for let order some food",
        },
        {
            title: "Hello how are you today",
            notificationMsg: "What are wating for let order some food",
        },
        {
            title: "hello",
            notificationMsg: "yunus",
        }
    ]

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        // Update the input value as it changes
        setInputValue(e.target.value);
    };

    const [inputMessage, setMessage] = useState( '');
    const handlemessagechange = (e) => {
    setMessage(e.target.value);
    console.log(inputMessage)

    }


    const handleButtonClick = () => {
        if (inputValue === '') {
            alert('Title or Message must not be blank')
        }
    }

    const setTitleAndMsg=(title, msg)=>{
        setInputValue(title)
        setMessage(msg)
    }
    

    return (
        <>
            <main className='content'>

                <div className='send-notifiction'>
                    <h4>Notify users about offers.</h4>
                    <textarea class="form-control title " aria-label="With textarea" value={inputValue} onChange={handleInputChange} placeholder='Title of Notification'></textarea>
                    <textarea class="form-control message" aria-label="With textarea"value ={inputMessage} onChange={handlemessagechange} placeholder='Message' ></textarea>
                </div>
                <div className='send-now'>
                    <button type="button" class="btn btn-primary ">SEND NOW</button><br></br>
                </div>
                <div className='schedule'>
                    <button type="button" onClick={handleButtonClick} class="btn btn-primary">SCHEDULE</button>
                </div>
                <div className='recent-message'>
                    <button  type="button" onClick={() => setModalShow(true)} class="message ">Show recents messages</button>
                    {/* {yunus && <Notifypopup />} */}

                </div>
                <Modal 
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow}
                > 
                    <Modal.Body>
                        <Notifypopup setTitleAndMsg={setTitleAndMsg} NotificationsData={NotificationsData} modalClose={modalClose}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </main>
        </>
    )

}

export default Notifiction;
