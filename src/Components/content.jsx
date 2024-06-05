import React from 'react';
import Login from './login';
import "./content.css";
import ShopitemsBox from './ShopitemsBox';


const content = () => {

    return (
        <main className='content'>
            <ShopitemsBox />
            {/* <Login /> */}
             
        </main> 
    )
}
export default content;