import React, { useEffect, useState } from 'react';
import { nappsFirebase } from '../../firebase'; // Import your Firebase configuration
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref as stRef, uploadBytes, getStorage, deleteObject } from 'firebase/storage';
import { ref as dbRef, set, get, remove, child, update } from 'firebase/database';

const WhatsAppMessage = () => {
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('create');
    const storage = getStorage();

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    const handleImageRemove = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const publicImageUrls = await Promise.all(images.map(async (image) => {
            const filename = `${Math.random().toString(36).substring(2, 15)}.${image.type.split('/')[1]}`;
            const storageRef = stRef(storage, `whatsapp-images/${filename}`);
            const uploadTask = await uploadBytes(storageRef, image);
            return getDownloadURL(uploadTask.ref);
        }));

        const newMessage = {
            text: message,
            images: publicImageUrls,
            timestamp: new Date().toISOString(),
        };

        const newMessageRef = dbRef((await nappsFirebase()).firebaseDb, 'whatsapp-messages/' + uuidv4());
        await set(newMessageRef, newMessage);

        setMessage('');
        setImages([]);
        fetchMessages();
    };

    const fetchMessages = async () => {
        const messagesRef = dbRef((await nappsFirebase()).firebaseDb, 'whatsapp-messages/');
        const snapshot = await get(messagesRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const fetchedMessages = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setMessages(fetchedMessages);
        }
    };

    const handleDeleteMessage = async (id) => {
        const messageRef = dbRef((await nappsFirebase()).firebaseDb, 'whatsapp-messages/' + id);
        await remove(messageRef);
        fetchMessages();
    };

    const handleDeleteImage = async (messageId, imageUrl) => {
        const imageRef = stRef(storage, imageUrl);
        await deleteObject(imageRef);

        const messageRef = dbRef((await nappsFirebase()).firebaseDb, 'whatsapp-messages/' + messageId);
        const snapshot = await get(messageRef);

        if (snapshot.exists()) {
            const messageData = snapshot.val();
            const updatedImages = messageData.images.filter((url) => url !== imageUrl);
            await update(messageRef, { images: updatedImages });
        }

        fetchMessages();
    };

    return (
        <div className="container mt-5">
            <div className="d-flex mb-4 mr-2">
                <button className={`btn btn-primary ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')} style={{marginRight:10}}>Create Message</button>
                <button className={`btn btn-primary ${activeTab === 'view' ? 'active' : ''}`} onClick={() => setActiveTab('view')}>View Messages</button>
            </div>
            {activeTab === 'create' && (
                <form onSubmit={handleFormSubmit}>
                    <h5>Create message</h5>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message"
                            rows="3"
                        />
                    </div><br/>
                    <div className="form-group">
                        <input className="form-control-file" type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    </div><br/>
                    <div className="form-group">
                        {images.map((image, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="img-thumbnail"
                                    width="100"
                                />
                                <button type="button" className="btn btn-danger ml-2" onClick={() => handleImageRemove(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                </form>
            )}
            {activeTab === 'view' && (
                <div className="row">
                    {messages.map((msg) => (
                        <div key={msg.id} className="col-md-4 mb-4" >
                            <div className="card">
                                <div className="card-body" style={{paddingTop:'20px'}}>
                                    <p className="card-text">{msg.text}</p>
                                    <div className="card-img">
                                        {msg?.images?.map((url, index) => (
                                            <div key={index} className="d-flex align-items-center mb-2">
                                                <img src={url} alt={`img-${index}`} className="img-thumbnail" width="100" />
                                                <button type="button" className="btn btn-danger ml-2" onClick={() => handleDeleteImage(msg.id, url)}>
                                                    Delete Image
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" className="btn btn-danger mt-2" onClick={() => handleDeleteMessage(msg.id)}>
                                        Delete Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WhatsAppMessage;
