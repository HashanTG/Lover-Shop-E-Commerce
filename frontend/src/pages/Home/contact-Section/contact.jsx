
import React from "react";
import "./contact.css";

import Button from "../../../components/shared/button/Button"

const contact = () => {
  return (
    <div className="contact_us">
    <h1 className="contact_title">Contact Us</h1>
    <div className="contact_details">
        <div className="contact_item">
            
            <h3>ADDRESS</h3>
            
            <p>234 Hai Trieu, Ho Chi Minh City, Viet Nam</p>
            </div>
        <div className="contact_item">
            {/* contact_image */}
            <h3>CONTACT US</h3>
            <p>+94 78 254 3766</p>
        </div>
        <div className="contact_item">
             {/* email_icon */}
            <h3>EMAIL</h3>
            <p>dilshankm91@gmail.com</p>
        </div>
    </div>
    <div className="form_map_container">
        <form action="" className="contact_form">
            <label htmlFor="name">FULL NAME</label>
            <input type="text" placeholder='Your Name' className='form_input' />
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" placeholder='Your Email' className='form_input' />
            <label htmlFor="messsage">MESSAGE</label>
            <textarea placeholder='Your Message' className='form_input'/>
            <Button label={"Contact Now"} onClick={() =>alert("Send Form")}/>

        </form>
        <div className="map_container">
           <img src="" alt="" />

        </div>
    </div>
</div>
  );
};

export default contact;
