import React from 'react';
import profile from '../../assets/profile.png';
import { connect } from 'react-redux';
import { toggleDropdownHidden } from '../../redux/dropdown/dropdown.actions';
import './profile-icon.scss';

const ProfileIcon = ({ toggleDropdownHidden }) => (
    <div className="profile" onClick={toggleDropdownHidden}>
        <div className="arrow">
            <img style={{width: '40px', height: '40px', borderRadius: '3rem'}} src={profile} alt="profile"/>
            <span className="down-arrow">&#x25BE;</span>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    toggleDropdownHidden: () => dispatch(toggleDropdownHidden())
})

export default connect(null, mapDispatchToProps)(ProfileIcon);