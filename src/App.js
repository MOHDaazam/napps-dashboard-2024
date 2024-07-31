import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/header';
import Sidebar from './Components/sidebar';
import Content from './Components/content';
import Login from './Components/login';
import WhatsAppSend from './Screens/WhatsAppUtility/WhatsAppSend';
import { useLayoutEffect, useState } from 'react';
import WhatsApUploadData from './Screens/WhatsAppUtility/WhatsAppUploadData';
import IframeComponent from './Screens/AonlaOnline/IframeComponent';
import OnGoingOrders from './Screens/AonlaOnline/OnGoingOrders';
import WhatsAppMessage from './Screens/WhatsAppUtility/WhatsAppMessage';



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
          <Route path="/whatsapp-message" element={<WhatsAppMessage />} />
          <Route path="/whatsapp-qr-code-login" element={<IframeComponent src="http://ec2-54-226-225-50.compute-1.amazonaws.com:8000" />} />
          <Route path="/aonla-online-ongoing-orders" element={<OnGoingOrders/>} />
          <Route path="/aonla-online-add-shop" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/add-shop" />} />
          <Route path="/aonla-online-add-vehicle" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/add-vehicle" />} />
          <Route path="/aonla-online-shop-auto" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/shop-auto-opener" />} />
          <Route path="/aonla-online-vehicle-service" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/vehicle-service" />} />
          <Route path="/aonla-online-refund-wallet" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/refund-wallet" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
