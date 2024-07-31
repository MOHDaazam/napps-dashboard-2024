import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Form, FormGroup, FormLabel, input, Button, Table, ProgressBar, FormFormLabel, Accordion, Card, Row, Col, Modal } from 'react-bootstrap';
import { nappsFirebase } from '../../firebase';
import { child, get, onValue, orderByValue, ref, remove, set, update } from 'firebase/database';
import { getDownloadURL, getStorage, uploadBytes, ref as stRef } from 'firebase/storage';
import { pingServer } from './utils';



const renderChooseMessage = (handler, lgShow, setLgShow, messages) => (
    <>
        <Button className='btn btn-danger' onClick={() => setLgShow(true)}>Choose Message</Button><br /><br />
        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Choose Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ overflowY: 'auto', height: '80vh' }}>
                <div className="row">
                    {messages.map((msg) => (
                        <div key={msg.id} className="col-12" onClick={() => handler(msg)} style={{ cursor: 'pointer' }}>
                            <div className="card">
                                <div className="card-body" style={{ paddingTop: '20px' }}>
                                    <p className="card-text">{msg.text}</p>
                                    <div className="card-img">
                                        {msg?.images?.map((url, index) => (
                                            <div key={index} className="d-flex align-items-center mb-2">
                                                <img src={url} alt={`img-${index}`} className="img-thumbnail" width="100" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setLgShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
)

const Configuration = () => {
    const [campaignName, setCampaignName] = useState('');
    const [fileName, setFileName] = useState('');
    const [maxCount, setMaxCount] = useState(700);
    const [howManyRounds, setHowManyRounds] = useState(1);
    const [deleteMsg, setDeleteMsg] = useState(true);
    const [startsFrom, setStartsFrom] = useState(0);
    const [endsTo, setEndsTo] = useState(699);
    const [generateOnlyReport, setGenerateOnlyReport] = useState(false);
    const [breathOn, setBreathOn] = useState(100);
    const [breatheFor, setBreatheFor] = useState(4);
    const [sendOnlyText, setSendOnlyText] = useState(false);
    const [stdCode, setStdCode] = useState('91');
    const [message, setMessage] = useState('');
    const [senderIds, setSenderIds] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedImages, setImages] = useState([]);
    const [serviceUrl, setServiceUrl] = useState('');
    const [lgShow, setLgShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const storage = getStorage();

    // Function to fetch options from Firebase
    const fetchOptions = async () => {
        const dbRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-customers/names'); // Create unique reference
        let listOfNames = await get(dbRef)
        if (listOfNames.val()) {
            listOfNames = listOfNames.val()
            const optionsArray = listOfNames ? Object.values(listOfNames) : [];
            setOptions(optionsArray);
        }
    };


    const fetchMessages = async () => {
        const messagesRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-messages/');
        const snapshot = await get(messagesRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const fetchedMessages = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setMessages(fetchedMessages);
        }
    };

    const setMessageAndImages = async (msg) => {
        setMessage(msg.text)
        setImages(msg.images)
        setLgShow(false)
    }
    // Fetch options from Firebase when component mounts
    useEffect(() => {
        fetchOptions();
        fetchMessages()
    }, []);


    const saveConfigurationToDb = async (campaign) => {
        const campaignConfigRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + campaign.campaignName + '/config'); // Create unique reference
        const campaignCustomerRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + campaign.campaignName + '/customers');
        const activeCampaignsRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/execution');
        let activeCampaigns = await (await get(activeCampaignsRef)).val()
        if (selectedImages) {
            // const publicImageUrls = await Promise.all(selectedImages.map(async (image) => {
            //     const filename = `${Math.random().toString(36).substring(2, 15)}.${image.type.split('/')[1]}`;
            //     const storageRef = stRef(storage, `whatsapp-images/${filename}`);
            //     const uploadTask = await uploadBytes(storageRef, image);
            //     return getDownloadURL(uploadTask.ref);
            // }));
            campaign.images = selectedImages;
        }
        const getCustomersDataRefByFileName = ref((await nappsFirebase()).firebaseDb, 'whatsapp-customers/data/' + campaign.fileName); // Create unique reference
        let customerDetails = await get(getCustomersDataRefByFileName)
        if (customerDetails.val()) {
            customerDetails = customerDetails.val()
            await update(campaignCustomerRef, customerDetails);
            await update(campaignConfigRef, campaign);
            if (activeCampaigns) {
                await update(activeCampaignsRef, { ...activeCampaigns, [activeCampaigns.length]: campaign.campaignName });
            } else {
                await update(activeCampaignsRef, { 0: campaign.campaignName });
            }
            alert('Campaign created!')
            setCampaignName('')
            setMaxCount(500)
            setHowManyRounds(1)
            setDeleteMsg(true)
            setStartsFrom(0)
            setEndsTo(499)
            setGenerateOnlyReport(false)
            setBreathOn(100)
            setBreatheFor(8)
            setSendOnlyText(false)
            setStdCode('91')
            setMessage('')
            setOptions([])
            setImages([])
            setServiceUrl('')
            setSenderIds('')
        }
    }

    const handleImageChange = (event) => {
        const _selectedImages = event.target.files;
        setImages([..._selectedImages]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            campaignName,
            fileName,
            maxCount,
            howManyRounds,
            deleteMsg,
            startsFrom,
            generateOnlyReport,
            breathOn,
            breatheFor,
            sendOnlyText,
            stdCode,
            message,
            endsTo,
            serviceUrl,
            senderIds
        };
        await saveConfigurationToDb(config)
    };



    return (

        <Form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem' }}>
            <h5>Create Campaign</h5><br />
            <FormGroup className='field-group' controlId="campaignName">
                <FormLabel>Campaign Name</FormLabel>
                <input className='form-control' type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} required autocomplete="on" />
            </FormGroup>
            <FormGroup className='field-group' controlId="fileName">
                <FormLabel>Customer Data File Name</FormLabel>
                <select className='form-control' value={fileName} onChange={(e) => setFileName(e.target.value)} required>
                    <option value="">Select a file</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option + '.json'}</option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup className='field-group' controlId="maxCount">
                <FormLabel>Maximum Messages to Send</FormLabel>
                <input className='form-control' type="number" value={maxCount} onChange={(e) => setMaxCount(parseInt(e.target.value))} required />
            </FormGroup>
            <FormGroup className='field-group' controlId="howManyRounds">
                <FormLabel>Sending Rounds per Customer</FormLabel>
                <input className='form-control' type="number" value={howManyRounds} onChange={(e) => setHowManyRounds(parseInt(e.target.value))} required />
            </FormGroup>
            <FormGroup className='field-group' controlId="deleteMsg">
                <FormLabel>
                    Delete Chat Messages (if supported by API)?
                    <input type="checkbox" checked={deleteMsg} onChange={(e) => setDeleteMsg(e.target.checked)} />
                </FormLabel>
            </FormGroup>
            <FormGroup className='field-group' controlId="startsFrom">
                <FormLabel>Start Sending from Customer Index</FormLabel>
                <input className='form-control' type="number" value={startsFrom} onChange={(e) => setStartsFrom(parseInt(e.target.value))} />
            </FormGroup>
            <FormGroup className='field-group' controlId="startsFrom">
                <FormLabel>End Sending from Customer Index</FormLabel>
                <input className='form-control' type="number" value={endsTo} onChange={(e) => setEndsTo(parseInt(e.target.value))} />
            </FormGroup>
            <FormGroup className='field-group' controlId="generateOnlyReport">
                <FormLabel>
                    Only Generate Report (No Sending)?
                    <input type="checkbox" checked={generateOnlyReport} onChange={(e) => setGenerateOnlyReport(e.target.checked)} />
                </FormLabel>
            </FormGroup>
            <FormGroup className='field-group' controlId="breathOn">
                <FormLabel>Introduce Breathing Delay after Every X Messages</FormLabel>
                <input className='form-control' type="number" value={breathOn} onChange={(e) => setBreathOn(parseInt(e.target.value))} />
            </FormGroup>
            <FormGroup className='field-group' controlId="breatheFor">
                <FormLabel>Breathing Delay Duration (Minutes)</FormLabel>
                <input className='form-control' type="number" value={breatheFor} onChange={(e) => setBreatheFor(parseInt(e.target.value))} />
            </FormGroup>

            <FormGroup className='field-group' controlId="sendOnlyText">
                <FormLabel>
                    Send Only Text Messages (or Text with Caption)?
                    <input type="checkbox" checked={sendOnlyText} onChange={(e) => setSendOnlyText(e.target.checked)} />
                </FormLabel>
            </FormGroup>

            <FormGroup className='field-group' controlId="stdCode">
                <FormLabel>Standard Code for Phone Numbers</FormLabel>
                <input className='form-control' type="text" value={stdCode} onChange={(e) => setStdCode(e.target.value)} autocomplete="on" />
            </FormGroup>

            <FormGroup className='field-group' controlId="message">
                <FormLabel>Message Content</FormLabel>
                <textarea
                    className='form-control'
                    autocomplete="on"
                    disabled="true"
                    type="checkbox"
                    rows="7"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </FormGroup>
            {/*
            <FormGroup className='field-group' controlId="image">
                <FormLabel>Choose image if any (optional)</FormLabel>
                <input className='form-control' type="file" accept="image/jpeg, image/png" onChange={handleImageChange} multiple />
            </FormGroup> */}

            {renderChooseMessage(setMessageAndImages, lgShow, setLgShow, messages)}
            <FormGroup className='field-group' controlId="breatheFor">
                <FormLabel>Napps Whatsapp Service URL</FormLabel>
                <input className='form-control' type="text" value={serviceUrl} onChange={(e) => setServiceUrl(e.target.value)} autocomplete="on" />
                <span style={{ color: 'orange' }}>https://bream-charmed-personally.ngrok-free.app/</span>
            </FormGroup>
            <FormGroup className='field-group' controlId="breatheFor">
                <FormLabel>Sender Ids of QR Code (comma separated, if many)</FormLabel>
                <input className='form-control' placeholder='eg: azam-napps,yunus-aonlaonline,anas-napps'
                    type="text" value={senderIds} onChange={(e) => setSenderIds(e.target.value)} autocomplete="on" />
                <span style={{ color: 'orange' }}>azam-napps,yunus-aonlaonline,anas-napps</span>
            </FormGroup>
            <br />
            <Button variant="primary" type="submit">
                Create Campaign
            </Button>
        </Form>
    );
};

const CustomerList = ({ customerData }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Phone Number</th>
                    <th>Sent Status</th>
                </tr>
            </thead>
            <tbody>
                {customerData.map((customer, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{customer.number}</td>
                        <td>{customer.message}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const SendingProgress = ({ currentCount, totalCount }) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const calculatePercentage = () => {
            if (totalCount > 0) {
                setPercentage(Math.floor((currentCount / totalCount) * 100));
            }
        };
        calculatePercentage();
    }, [currentCount, totalCount]);

    return (
        <ProgressBar now={percentage} />
    );
};

const Logs = ({ logs }) => {
    return (
        <pre>{JSON.stringify(logs, null, 2)}</pre>
    );
};

const activePromisesOf = {}
let sendMessageAbortController = null;
const WhatsAppSend = (props) => {
    const [campaignConfig, setCampaignConfig] = useState(null);
    const [sectionSelected, showSection] = useState('create-campaign');
    const [customerData, setCustomerData] = useState([]);
    const [currentCount, setCurrentCount] = useState(0);
    const [logs, setLogs] = useState([]);
    const [campaignNames, setCampaignNames] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const [lastMessageTo, setLastMessageTo] = useState('');
    const [campaignsData, setCampaignsData] = useState({});
    const [updatedConfigJSON, setUpdatedConfig] = useState('');
    const [isEditingCampaign, setEditCampaign] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const audioRef = useRef(null); // Reference to the ReactAudioPlayer component
    const sendCounterRef = useRef(0)
    const totalPhoneNumbersRef = useRef(0)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedImages, setImages] = useState([]);

    const fetchMessages = async () => {
        const messagesRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-messages/');
        const snapshot = await get(messagesRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const fetchedMessages = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setMessages(fetchedMessages);
        }
    };

    const updatedConfigSave = async (parsedData = null) => {
        const campaignConfigRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + selectedCampaign + '/config');
        try {
            await set(campaignConfigRef, parsedData ? parsedData : JSON.parse(updatedConfigJSON))
            setEditCampaign(false)
        } catch (e) {
            alert(String(e))
        }


    }

    const setMessageAndImages = async (msg) => {
        const configData = campaignsData[selectedCampaign]?.config
        if (configData) {
            const dataToSave = configData
            console.log(dataToSave, 'dataToSave')
            if (msg.images) {
                dataToSave.images = msg.images
                dataToSave.sendOnlyText = false
            } else {
                dataToSave.sendOnlyText = true
                delete dataToSave.images
            }
            dataToSave.message = msg.text
            updatedConfigSave(dataToSave)
            setLgShow(false)
            alert('Updated!')
        }
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current = 'play';
            setIsPlaying(false);
        } else {
            setIsPlaying(true)
            sendMessageAbortController = new AbortController();
        }

    };

    const handleStop = () => {
        setIsPlaying(false);
    };

    const resetCuustomers = async (configuration) => {
        const status = window.confirm("You are resetting customers data, previously sent message will get choose message.")
        if (status) {
            const dataListRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-customers/data/' + configuration.config.fileName);
            const customersFreshData = await (await get(dataListRef)).val()
            console.log(customersFreshData)
            const campaignCustomerRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + configuration.config.campaignName + '/customers');
            await set(campaignCustomerRef, customersFreshData)
            alert('Reset completed!')
        }
    }

    const showAndSetCustomerData = async (campaignName, fetchConfigOnly = true) => {
        const campaignConfigRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + campaignName + '/config'); // Create unique reference
        const campaignCustomerRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + campaignName + '/customers');
        let customers = {}
        let configCamp = {}
        if (selectedCampaign !== campaignName) {
            setSelectedCampaign(campaignName)
        } else if (fetchConfigOnly) {
            window.unsubscribeConfig()
            return
        } else if (selectedCampaign !== campaignName && !fetchConfigOnly) {
            window.unsubscribeCustomers()
            window.unsubscribeConfig()
            return
        }
        if (fetchConfigOnly) {
            window.unsubscribeConfig = onValue(campaignConfigRef, (snapshot) => {
                const fetchedData = snapshot.val();
                const newData = {}
                newData[campaignName] = { customers, config: fetchedData }
                setCampaignsData(newData); // Update state with new data on any change
                const lastCount = fetchedData?.startsFrom
                if (sendCounterRef.current) {
                    sendCounterRef.current.textContent = lastCount;
                }

            });
            return
        }
        window.unsubscribeConfig = onValue(campaignConfigRef, (snapshot) => {
            const fetchedData = snapshot.val();
            configCamp = fetchedData
            const newData = {}
            newData[campaignName] = { config: fetchedData, customers }
            setCampaignsData(newData); // Update state with new data on any change
        });
        window.unsubscribeCustomers = onValue(campaignCustomerRef, (snapshot) => {
            const fetchedData = snapshot.val();
            customers = fetchedData
            const newData = {}
            newData[campaignName] = { config: configCamp, customers: fetchedData }
            setCampaignsData(newData); // Update state with new data on any change
            if (totalPhoneNumbersRef.current) {
                totalPhoneNumbersRef.current.textContent = Object.keys(fetchedData).length;
            }
        });

    }
    const getAndSetCampaigns = () => {
        getCampaignNames()
            .then(names => {
                console.log(names);
                if (Array.isArray(names)) {
                    setCampaignNames(names);
                } else {
                    setCampaignNames(Object.values(names));
                }
            })
            .catch(error => {
                console.error('Error fetching campaign names:', error);
            });
    }
    useEffect(() => {
        getAndSetCampaigns()
        fetchMessages()
    }, []);

    const deleteCampaign = async () => {
        const status = window.confirm('You are deleting this campaign!')
        if (status) {
            const activeCampaignsRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + selectedCampaign);
            findAndDeleteByValue('whatsapp-campaign/execution', selectedCampaign)
            remove(activeCampaignsRef)
        }
    }

    const getCampaignNames = async () => {
        const activeCampaignsRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/execution');
        return await (await get(activeCampaignsRef)).val() || []
    }

    // Function to send a message to a customer
    const sendMessage = async (customer, campaignConfig, index, customerNumber) => {
        const { stdCode, message, serviceUrl, breathOn, breatheFor, sendOnlyText, images, senderIds } = campaignConfig;
        let { Name, } = customer; // Assuming message property exists in customer data
        console.log(customerNumber, 'customerNumbercustomerNumber')
        const Phone = customerNumber.trim().replace(' ', '')
        const last10Digits = Phone.slice(-10);
        const payload = {
            number: String(Phone).length > 11 && [...Phone][0] !== '0' ? Phone : (stdCode + last10Digits),
            message
        };
        if (!sendOnlyText) {
            payload.caption = message
        }
        if (images) {
            payload.images = images
        }
        const senderIdsArray = senderIds.split(',')
        // Get the current senderId based on index
        const currentSenderId = senderIdsArray[index % senderIdsArray.length]; // Using modulo to cycle through ids

        // Use currentSenderId in your payload or wherever needed
        payload.sender = currentSenderId;
        const sendMe = async (sendAt) => {
            await new Promise((resolve, reject) => {
                if (senderIdsArray.length === 0) {
                    alert('Failed, No sender found! Add "senderIds"')
                    reject(new Error(' sender found!'));
                }
                const timeout = setTimeout(async () => {
                    console.log(sendMessageAbortController.signal.aborted, 'sendMessageAbortController.signal.aborted')
                    sendMessageAbortController.signal.addEventListener('abort', () => {
                        reject(new Error('Promise cancelled'));
                    });
                    if (sendMessageAbortController.signal.aborted) {
                        reject(new Error('Promise cancelled'));
                        return;
                    }

                    if (campaignConfig?.images) {
                        payload.images = campaignConfig.images
                    }
                    let response = null
                    const campaignPath = 'whatsapp-campaign/saved/' + campaignConfig.campaignName + '/customers/' + Phone + '/Sent';
                    const campaignConfigPath = 'whatsapp-campaign/saved/' + campaignConfig.campaignName + '/config/startsFrom';
                    try {
                        response = await axios.post(`${serviceUrl}/${!sendOnlyText ? 'send-media' : 'send-message'}`,
                            payload, {
                            signal: sendMessageAbortController.signal,
                            headers: {
                                "ngrok-skip-browser-warning": "69420"
                            },
                        });
                    } catch (error) {
                        if (error.name !== 'AbortError') {
                            console.log(error, 'error');
                            if (error?.code === "ERR_NETWORK") {
                                alert('Server not Running, stopped!')
                                setIsPlaying(false)
                                setLastMessageTo('Server not Responding, stopped!')
                                sendMessageAbortController.abort()
                            }
                            if (error?.message.includes('422')) {
                                const campaignCustomerRef = ref((await nappsFirebase()).firebaseDb, campaignPath);
                                const sentCurrentValue = await (await get(campaignCustomerRef)).val()
                                await set(campaignCustomerRef, sentCurrentValue || 0 + ',' + campaignConfig.howManyRounds)
                                const campaignConfigCustomerRef = ref((await nappsFirebase()).firebaseDb, campaignConfigPath);
                                await set(campaignConfigCustomerRef, index + 1)
                            }
                            setLastMessageTo(Phone + " " + (error?.message.includes('422') && "Not on whatsapp!"));
                            setLogs([...logs, { message: `${(error?.message.includes('422') && "Not on whatsapp!")} ${Name} :: ${Phone} :: ${getDate()}` }]);
                        } else if (error.name === 'AbortError') {
                            setIsPlaying(false)
                            setLastMessageTo('Aborted by user!')
                            sendMessageAbortController.abort()
                        }
                    } finally {
                        clearTimeout(timeout);
                    }
                    const status = response?.data?.status;
                    console.log(status);

                    if (status) {
                        setLastMessageTo(Phone + ' sent!');
                        setLogs([...logs, { message: `Success :: ${Name} :: ${Phone} :: ${getDate()}` }]);
                        const campaignCustomerRef = ref((await nappsFirebase()).firebaseDb, campaignPath);
                        const sentCurrentValue = await (await get(campaignCustomerRef)).val()
                        await set(campaignCustomerRef, sentCurrentValue || 0 + ',' + campaignConfig.howManyRounds)
                        const campaignConfigCustomerRef = ref((await nappsFirebase()).firebaseDb, campaignConfigPath);
                        await set(campaignConfigCustomerRef, index + 1)
                    } else if (!status && typeof status !== 'undefined') {
                        console.log(response);
                        if (response.data?.message.includes('The number is not registered')) {
                            const campaignCustomerRef = ref((await nappsFirebase()).firebaseDb, campaignPath);
                            const sentCurrentValue = await (await get(campaignCustomerRef)).val()
                            await set(campaignCustomerRef, sentCurrentValue || 0 + ',' + campaignConfig.howManyRounds)
                            const campaignConfigCustomerRef = ref((await nappsFirebase()).firebaseDb, campaignConfigPath);
                            await set(campaignConfigCustomerRef, index + 1)
                        }
                        setLastMessageTo(Phone + response.data?.message);
                        setLogs([...logs, { message: `${response.data?.message} ${Name} :: ${Phone} :: ${getDate()}` }]);
                    } else {
                        console.log(response);
                        setLastMessageTo(Phone + ' failed!');
                        setLogs([...logs, { message: `Failed :: ${Name} :: ${Phone}  :: ${getDate()}` }]);
                    }
                    if (campaignConfig.deleteMsg && status === 'success') {
                        // Send an API request to delete the chat if supported by your API
                        // try {
                        //     await axios.post('/delete-chat', { number: stdCode + Phone });
                        //     setLogs([...logs, { message: `Deleted chat with ${Phone}` }]);
                        // } catch (error) {
                        //     console.error('Error deleting chat:', error);
                        //     setLogs([...logs, { message: `Error deleting chat with ${Phone}`, error }]);
                        // }
                    }
                    resolve();

                }, sendAt);
            });
        };
        if ((index + 1) % breathOn === 0) {
            setLastMessageTo('Breathing...')
            await sendMe(breatheFor * 60 * 1000)

        } else if (index === campaignConfig.startsFrom) {
            await sendMe(0)
        } else {
            await sendMe(getRandomNumber(4, 15) * 1000)
        }
        if (sendCounterRef.current) {
            sendCounterRef.current.textContent = index;
        }
    };

    useEffect(() => {
        const _startSending = async () => {
            await startSending();
        };
        _startSending(isPlaying);
        return () => {
            // Cleanup code here
        };
    }, [isPlaying]);

    const startSending = async (_isPlaying = isPlaying) => {
        const _campaignsData = campaignsData[selectedCampaign]
        if (!_campaignsData) {
            return
        }
        if (!_campaignsData['config']) {
            setIsPlaying(false);
            alert('Camp. Config not found, can not start!')
            return
        }
        if (Object.keys(_campaignsData['customers']).length == 0) {
            setIsPlaying(false);
            alert('Camp. Customers not found, can not start, Fetch Customers First!')
            return
        }
        activePromisesOf[selectedCampaign] = true
        audioRef.current = 'pause';
        setLastMessageTo('Started...');
        const campaignConfigRef = ref((await nappsFirebase()).firebaseDb, 'whatsapp-campaign/saved/' + selectedCampaign + '/config'); // Create unique reference
        const campaignConfig = (await get(campaignConfigRef)).val()

        const result = await pingServer(campaignConfig.serviceUrl);
        if (result.active) {
            console.log(`Server is active. Latency: ${result.latency}ms`);
        } else {
            alert(`Server is not active : ${campaignConfig.serviceUrl}`)
            console.log(`Server is not active. Status: ${result.status || 'Unknown'}`);
            setIsPlaying(false)
            setLastMessageTo('Server not active!')
            sendMessageAbortController.abort()
            return;
        }

        const selectedCustomers = _campaignsData['customers']
        const sortedNumbers = Object.keys(_campaignsData['customers']).sort();

        let maxCount = 0
        let moreMessage = false
        if (sortedNumbers.length < campaignConfig.maxCount) {
            maxCount = sortedNumbers.length
        } else {
            maxCount = campaignConfig.maxCount + campaignConfig.startsFrom
            moreMessage = true
        }
        for (let i = campaignConfig.startsFrom; i <= maxCount; i++) {
            if (_isPlaying) {
                if (i >= maxCount) {
                    if (!moreMessage) {
                        alert('Completed, No more numbers to send message!');
                    } else {
                        alert('Message limit reached, stopping campaign');
                    }
                    setLastMessageTo('Pause/Completed')
                    setIsPlaying(false)
                    break;
                }
                const customerNumber = sortedNumbers[i];
                const customer = selectedCustomers[customerNumber]
                console.log(customer)
                if ((!customer?.sent_cycle || customer?.sent_cycle < campaignConfig.howManyRounds) && (!('Sent' in customer) || !customer['Sent'].includes(campaignConfig.howManyRounds))) {
                    await sendMessage(customer, campaignConfig, i, customerNumber);
                } else if ('Sent' in customer) {
                    setLastMessageTo(customerNumber + ' already sent, skipping!');
                }
            } else {
                setIsPlaying(false)
                setLastMessageTo('Stopped!')
                sendMessageAbortController.abort()
                break;
            }

        }
    }

    const modifiedCampaignsData = JSON.parse(JSON.stringify(campaignsData, (key, value) => {
        if (key === 'images' && Array.isArray(value)) {
            return value.length; // Replace the array with its length
        }
        return value; // Keep other properties unchanged
    }));

    return (
        <div className='container'>
            <div style={{ display: 'flex' }}>
                <h4>Whatsapp Send</h4>
                {sectionSelected === 'create-campaign' ?
                    <Button variant="primary" style={{ marginLeft: 'auto' }}
                        onClick={() => {
                            getAndSetCampaigns();
                            showSection('all-campaigns')
                        }}>
                        View/Start Campaigns
                    </Button> : <Button variant="primary" style={{ marginLeft: 'auto' }} onClick={() => { showSection('create-campaign') }}>
                        Create Campaign
                    </Button>
                }
            </div>
            <br />
            {sectionSelected === 'all-campaigns' ? (
                <div style={{ background: 'white', padding: '2rem' }}>
                    <h5>All Campaigns</h5>
                    <h6>Selected Campaign : <span style={{ color: 'blue' }}>{selectedCampaign}</span></h6>
                    <h6>Total Phone Numbers : <span ref={totalPhoneNumbersRef} style={{ color: 'green' }}>0</span></h6>
                    <h6>Last Count : <span ref={sendCounterRef} style={{ color: 'green' }}>0</span></h6>
                    <h6>Logs:</h6>
                    {logs.length > 0 &&
                        <pre
                            style={{ maxHeight: '200px', background: 'black', padding: '1rem' }}>
                            <button style={{ position: 'absolute', right: 120 }} onClick={() => setLogs([])}>clear</button>
                            {logs.reverse().map(l => (<p style={{ color: 'white', marginBottom: '0.1rem' }}>
                                {`${l.message}`}
                            </p>))}
                        </pre>}
                    <h6>Names:</h6>
                    <Accordion defaultActiveKey="0">
                        {campaignNames?.map((name, i) => {
                            return <Accordion.Item eventKey={i}>
                                <Accordion.Header style={{ background: 'white' }} onClick={() => {
                                    if (totalPhoneNumbersRef.current) {
                                        totalPhoneNumbersRef.current.textContent = 'Fetch Now'
                                    }
                                    setLogs([])
                                    setUpdatedConfig('');
                                    setEditCampaign(false);
                                    document.title = name
                                    showAndSetCustomerData(name)
                                }}>{name}</Accordion.Header>
                                <Accordion.Body>
                                    <div style={{ display: 'flex' }}>
                                        <div xs={6}>
                                            <span>Status : <span style={{ color: 'blue', fontWeight: '600' }}>{lastMessageTo}</span></span>
                                        </div>
                                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                                            <div xs={2}>
                                                <Button variant="primary" onClick={handlePlayPause} size="sm">
                                                    {isPlaying ? 'Pause' : 'Play'}
                                                </Button>
                                            </div>
                                            <div xs={2}>
                                                <Button variant="danger" onClick={handleStop} size="sm">
                                                    Stop
                                                </Button>
                                            </div>
                                            <div xs={2}>
                                                <Button variant="danger" onClick={deleteCampaign} size="sm">
                                                    Delete Campaign
                                                </Button>
                                            </div>
                                        </div>
                                    </div><br />
                                    <div style={{ display: 'flex', justifyContent: 'normal', gap: '10px' }}>
                                        <Button className='btn btn-warning'
                                            onClick={() => { showAndSetCustomerData(name, false) }}>
                                            Fetch Customers</Button><br /><br />
                                        {renderChooseMessage(setMessageAndImages, lgShow, setLgShow, messages)}
                                        <Button onClick={() => { setEditCampaign(!isEditingCampaign) }}>{isEditingCampaign ? 'Cancel Editing' : 'Edit Campaign Setting'}</Button><br /><br />
                                        <Button className='btn btn-warning' onClick={() => { resetCuustomers(campaignsData[selectedCampaign]) }}>Reset Customers</Button><br /><br />
                                    </div><br />
                                    {isEditingCampaign ?
                                        <>
                                            <p style={{ color: 'orange' }}>Please be cautious, don't change "campaignName" ever!</p>
                                            <textarea
                                                className='form-control'
                                                style={{ width: '100%' }}
                                                rows={26} // Adjust rows as needed
                                                cols={10} // Adjust cols as needed
                                                onChange={(evt) => { setUpdatedConfig(evt.target.value) }}
                                                value={updatedConfigJSON.length ? updatedConfigJSON : JSON.stringify(campaignsData[selectedCampaign]?.config, null, 2)} /><br />
                                            <Button className='btn-success' onClick={async () => {
                                                const status = window.confirm(`You are updating ${selectedCampaign}!`)
                                                if (status) {
                                                    await updatedConfigSave()
                                                }
                                            }}>Save</Button><br /><br />
                                        </>
                                        :
                                        <pre>{JSON.stringify(modifiedCampaignsData, null, 2)}</pre>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>

                        })}
                    </Accordion>
                </div>
            ) : (
                <>
                    <Configuration onCampaignStart={setCampaignConfig} showSection={showSection} />
                </>

            )}
        </div>
    )
}
export default WhatsAppSend;


// Function to find the index of a campaign by its value and delete it
async function findAndDeleteByValue(campaignPath, selectedCampaignValue) {
    console.log(selectedCampaignValue, campaignPath)
    const campaignRef = ref((await nappsFirebase()).firebaseDb, campaignPath);


    // Fetch the data
    const snapshot = await get(campaignRef);
    if (snapshot.exists()) {
        // Iterate through the snapshot to find the index
        console.log(snapshot.val())
        let campaignKeyToDelete = null;
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val() === selectedCampaignValue) {
                campaignKeyToDelete = childSnapshot.key;
                return; // Exit loop once found
            }
        });

        if (campaignKeyToDelete !== null) {
            console.log(campaignKeyToDelete)
            // Delete the campaign at the specified path
            const todoRefToRemove = child(campaignRef, campaignKeyToDelete);
            remove(todoRefToRemove)
            // console.log(asdsad)
            console.log("Deleted successfully");
        } else {
            console.log("Not found");
        }
    } else {
        console.log("No data available");
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDate() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return now.toLocaleDateString('en-US', options);
}


