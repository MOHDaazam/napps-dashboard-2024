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
          <Route path="/whatsapp-qr-code-login" element={<IframeComponent src="https://bream-charmed-personally.ngrok-free.app" />} />
          <Route path="/aonla-online-ongoing-orders" element={<OnGoingOrders/>} />
          <Route path="/aonla-online-add-shop" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/add-shop" />} />
          <Route path="/aonla-online-add-vehicle" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/add-vehicle" />} />
          <Route path="/aonla-online-shop-auto" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/shop-auto-opener" />} />
          <Route path="/aonla-online-vehicle-service" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/vehicle-service" />} />
          <Route path="/aonla-online-refund-wallet" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/refund-wallet" />} />
          <Route path="/aonla-online-current-orders" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/current-orders" />} />
          <Route path="/aonla-online-manage-products" element={<IframeComponent src="https://salesmafiaonline.pythonanywhere.com/manage-products" />} />
          <Route path="/aonla-online-Offline-Menu" element={<IframeComponent src="https://www.canva.com/design/DAGJUDF73y0/aP-VlYYPo7sPSRXHYmR7Bg/view?utm_content=DAGJUDF73y0&utm_campaign=designshare&utm_medium=link&utm_source=editor#1" />} />
          <Route path="/aonla-online-Cron-Jobs" element={<IframeComponent src="https://console.cron-job.org/login" />} />
          <Route path="/aonla-online- Google-Analytics" element={<IframeComponent src="https://lookerstudio.google.com/embed/reporting/4029f085-c8bb-4e2c-ab2d-9a30e763f5d1/page/p_ev5o6t54bd" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
