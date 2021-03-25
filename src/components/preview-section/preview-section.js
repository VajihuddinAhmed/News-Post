import React from 'react';
import books from '../../assets/Books.jpeg';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button';
import './preview-section.scss';

const PreviewSection = () => (
    <div className="section-container">
        <div className="section-preview">
            <h1 className="title">Explore new <br />perspectives</h1>
            <p className="para">Read and share ideas from independent voices, world-class<br/> publications, and experts from around the globe.<br/> Everyone's welcome.</p>
            <Link to="/signin">
                <CustomButton>Get Started</CustomButton>
            </Link>
        </div>
        <div className="section-image">
            <img alt="books" src={books} style={{width: '500px', height: '320px'}} />
        </div>
    </div>
);

export default PreviewSection;