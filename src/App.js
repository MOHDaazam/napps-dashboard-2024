import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/header';
import Sidebar from './Components/sidebar';
import Content from './Components/content';
import Login from './Components/login';
import WhatsAppSend from './Screens/WhatsAppUtility/WhatsAppSend';
import { useLayoutEffect, useState } from 'react';
import WhatsApUploadData from './Screens/WhatsAppUtility/WhatsAppUploadData';



function App() {

  const [widthMain, setWidthMain] = useState(0)
  const [widthMainInner, setInnerWidthMain] = useState(200)

  useLayoutEffect(() => {
    const widthSideBar = document.getElementById('sidebar').offsetWidth
    setWidthMain(widthSideBar)
    setInnerWidthMain(window.innerWidth)
  })
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <main style={{ marginTop: '100px', marginLeft: widthMain, width: 'max-content', minWidth: widthMainInner }}>
        <Routes>
          <Route path="/whatsapp-send" element={<WhatsAppSend />} />
          <Route path="/whatsapp-data-file" element={<WhatsApUploadData />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
