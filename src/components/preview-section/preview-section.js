import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button';
import './preview-section.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const PreviewSection = ({ user }) => {
    const currentUser = user === null
    return (
        <div className="preview-container">
            <div className="section-preview">
                <h1 className="title">Explore new <br />perspectives</h1>
                <p className="para">Read and share ideas from independent voices, world-class<br/> publications, and experts from around the globe.<br/> Everyone's welcome.</p>
                <Link to={currentUser ? "/signin" : "/" }>
                    <CustomButton>Get Started</CustomButton>
                </Link>
            </div>
            <div></div>
            <div></div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(PreviewSection);