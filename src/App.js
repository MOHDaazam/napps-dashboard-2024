import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Components/header';
import Sidebar from './Components/sidebar';
import Content from './Components/content';
// import ShopitemsBox from './Components/ShopitemsBox';
import Login from './Components/login';
import Accordion from './Components/accordion';
import Codsettlement from './Components/codsettlement';
import Notification from './Components/notifiction';
import Shophandler from './Components/shophandler';



function App() {
  return (



    <BrowserRouter>
        <Header />
        <Sidebar />
     
       <Routes>

            <Route path="/" element={<Content />} />
            <Route path="/shop-menu" element={<Content />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accordion" element={<Accordion />} />
            <Route path="/cod-settlement" element={<Codsettlement/>} />
            <Route path='/notification'element={<Notification/>} /> 
            <Route path='/shophandler'element={<Shophandler/>} /> 
            <Route path='/on-going-orders'element={<Shophandler/>} /> 
          </Routes> *

        
    
    </BrowserRouter>
  );
}

export default App;
