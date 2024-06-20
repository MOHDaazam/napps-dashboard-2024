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

  useLayoutEffect(()=>{
    const widthSideBar = document.getElementById('sidebar').offsetWidth + 10
    setWidthMain(widthSideBar)
  })
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <main style={{ marginTop: '100px', marginLeft: widthMain }}>
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
