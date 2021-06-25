import React from 'react';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { toggleDropdownHidden } from '../../redux/dropdown/dropdown.actions';
import defaultPic from '../../assets/profile.png';
import './profile-icon.scss';

const ProfileIcon = ({ toggleDropdownHidden, user }) => {
    
    return (
    <div className="profile" onClick={toggleDropdownHidden}>
        <div className="arrow">
            <img style={{width: '40px', height: '40px', borderRadius: '3rem'}} src={user.data.profilePic ? user.data.profilePic : defaultPic} alt="profile"/>
            <span className="naming">{user.data.name}&#x25BE;</span>
        </div>
    </div>
    )
};

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    toggleDropdownHidden: () => dispatch(toggleDropdownHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);