import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FormGroup, Input, Tab } from 'react-bootstrap';
import Papa from 'papaparse';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'react-bootstrap';
import ReactJsonPretty from 'react-json-pretty';

import { ref, push, update, get } from 'firebase/database'
import 'firebase/database'; // Required for Realtime Database
import './index.css'; // Assuming you have a CSS file for styling
import { firebaseDb } from '../../firebase';


// Replace with your Firebase project configuration



const CsvUploader = ({ onUpload }) => {
    const [csvData, setCsvData] = useState([]);
    const [fileName, setFileName] = useState(''); // State for filename input
    const fileInputRef = useRef(null);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // setFileName(file.name); // Update filename state for uniqueness check

        Papa.parse(file, {
            header: true, // Treat the first row as headers
            complete: (results) => {
                setCsvData(results.data);
                onUpload(results.data); // Pass data for potential Firebase storage
            },
        });
    };

    // Save data to Firebase Realtime Database
    const saveDataToFirebase = async (e) => {
        e.preventDefault()
        const dataToSave = {}
        csvData.forEach(record => {
            if (record['Number']) {
                dataToSave[record['Number']] = record
            }
        })
        if (Object.keys(dataToSave).length > 0) {
            const dataRef = ref(firebaseDb, 'whatsapp-customers/data/' + fileName.replace('.csv', '')); // Create unique reference
            const dataListRef = ref(firebaseDb, 'whatsapp-customers/names'); // Create unique reference
            let listOfNames = await get(dataListRef)
            if (listOfNames.val()) {
                listOfNames = listOfNames.val()
                await update(dataListRef, { ...listOfNames, [listOfNames.length]: fileName.replace('.csv', '') });
            } else {
                await update(dataListRef, { 0: fileName.replace('.csv', '') });
            }
            await update(dataRef, dataToSave);
            setFileName('')
            fileInputRef.current = ''
            alert('Saved!')
        } else {
            alert('Name column not found in ' + fileName)
        }

    };

    return (
        <Form>
            <FormGroup>
                <input
                    className='form-control'
                    placeholder='Filename (must be unique)'
                    type='text'
                    required
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
                <br />
                <input type="file" accept=".csv" onChange={handleUpload} ref={fileInputRef} required />
                <br /><br />
            </FormGroup>
            <Button type='submit' variant="primary" onClick={saveDataToFirebase}>
                Upload CSV
            </Button>
        </Form>
    );
};

const JsonView = ({ data }) => {
    // Customizable options for react-json-pretty:
    const options = {
        theme: 'monokai', // Choose a theme from: https://www.npmjs.com/package/react-json-pretty#available-themes
        spacing: 0, // Adjust indentation for readability
        noKeyPrefix: false, // Display keys without prefixes
        inlineCollapsedCount: true, // Show number of collapsed elements within brackets
        iconStyle: 'triangle', // Customize collapse/expand icons (see documentation)
    };

    return (
        <ReactJsonPretty
            data={data}
            options={options}
        />
    );
};

const FileListItem = ({ fileName, onClick }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {fileName}
            <button className="btn btn-sm btn-primary" onClick={onClick}>
                View Data
            </button>
        </li>
    );
};

const WhatsApUploadData = () => {
    const [activeKey, setActiveKey] = useState('upload');
    const [csvData, setCsvData] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleSelect = (key) => setActiveKey(key);

    const getAllFilesName = async () => {
        const dataListRef = ref(firebaseDb, 'whatsapp-customers/names'); // Create unique reference
        const listOfNames = await get(dataListRef)
        console.log(listOfNames.val())
        if (listOfNames.val())
            setUploadedFiles(listOfNames.val())
    }

    return (
        <div className="container" style={{ background: 'white', padding: '2rem' }}>
            <Nav variant="tabs" defaultActiveKey="upload" onSelect={handleSelect}>
                <NavItem>
                    <NavLink eventKey="upload">Upload Customer CSV</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink eventKey="json" onClick={async () => await getAllFilesName()}>View Uploaded Files</NavLink>
                </NavItem>
            </Nav>
            <Tab.Container defaultActiveKey="upload" activeKey={activeKey}>
                <Tab.Pane eventKey="upload">
                    <br />
                    <h5>Add Customers File</h5>
                    <br />
                    <CsvUploader onUpload={setCsvData} />
                </Tab.Pane>
                <Tab.Pane eventKey="json" >
                    {uploadedFiles.length > 0 ? (
                        <ul className="list-group" >
                            {uploadedFiles.map((fileName, index) => (
                                <FileListItem
                                    key={index}
                                    fileName={fileName}
                                    onClick={() => {
                                        // Handle viewing specific data based on fileName
                                        console.log(`Viewing data for: ${fileName}`); // Replace with your logic

                                        // You can fetch the data from Firebase using the fileName
                                        // const dataRef = ref(db, `uploaded_files/${file.fileName}`);

                                        // ... logic to retrieve and display data based on fileName
                                    }}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>No uploaded files yet.</p>
                    )}
                </Tab.Pane>
            </Tab.Container>
        </div>
    );
};

export default WhatsApUploadData;