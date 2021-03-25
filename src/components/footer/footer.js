import React from 'react';
import { Link } from 'react-router-dom';
import discord from '../../assets/icons-discord.png';
import fb from '../../assets/icons-facebook.png';
import linkedIn from '../../assets/icons-linkedin.png';
import twitter from '../../assets/icons-twitter.png';
import './footer.scss';

const Footer = () => (
    <div className="footer">
        <div className="container">
            <div className="section">
                <h1 className="title">News post</h1>
                <div className="follow">
                    <img alt="images" src={discord} style={{ width: '50px', height: '50px'}}/>
                    <img alt="images" src={fb} style={{ width: '50px', height: '50px'}}/>
                    <img alt="images" src={linkedIn} style={{ width: '50px', height: '50px'}}/>
                    <img alt="images" src={twitter} style={{ width: '50px', height: '50px'}}/>
                </div>
            </div>
            <div className="options">
                <div className="option">
                    <h4>GENERAL</h4>
                    <Link className="links" to="#">Sign Up</Link>
                    <Link className="links" to="#">About</Link>
                    <Link className="links" to="#">Faq's</Link>
                </div>
                <div className="option">
                    <h4>CONTACT US</h4>
                    <Link className="links" to="#">Location</Link>
                    <Link className="links" to="#">Phone Number</Link>
                    <Link className="links" to="#">info@newspost.com</Link>
                </div>
            </div>
        </div>
        <div className="copyright">
            <h5 className="copyright-title"> © COPYRIGHT NEWSPOST</h5>
        </div>
    </div>
)

export default Footer;