import React from 'react';
import './Footer.css';
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="brand">
          <h2>Rosa Lovers</h2>
          <p>More than just a game.<br/>It's a lifestyle.</p>
          <div className="social_icons">
            <a href="#" target="_blank" rel= "noreferrer">
              <i className="fa-instergram"></i>
            </a>
            <a href="#" target="_blank" rel= "noreferrer">
              <i className="fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel= "noreferrer">
              <i className="fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="footer_links">
          <div>
            <h3>Page</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Product</a></li>
              <li><a href="#">Articles</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3>Info</h3>
            <ul>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Return & Refund</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">FAQs</a></li>

            </ul>
          </div>
          <div>
            <h3>Office</h3>
            <ul>
              <li>Rosa Lover</li>
              <li>Mirigama</li>
              <li>Sri Lanka</li>
              <li>078 256 3766</li>
            </ul>

          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <p>Copyright © 2023 rosalovers. All rights reserved |
          <a href="#"> Privacy Policy</a> |
          <a href="#"> Terms & Conditions</a>
        </p>
        <div className="payment_methods">
          <img src="visa" alt="" />
          <img src="" alt="Visa" />
          <img src="" alt="MasterCard" />
          <img src="" alt="paypal" />
          <img src="" alt="Apple Pay" />
          <img src="" alt="" />

        </div>
      </div>
    </footer>
  )
}

export default Footer