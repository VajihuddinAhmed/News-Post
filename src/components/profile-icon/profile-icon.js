import React from 'react';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import { toggleDropdownHidden } from '../../redux/dropdown/dropdown.actions';
import './profile-icon.scss';

const ProfileIcon = ({ toggleDropdownHidden, user }) => (
    <div className="profile" onClick={toggleDropdownHidden}>
        <div className="arrow">
            <img style={{width: '40px', height: '40px', borderRadius: '3rem'}} src={user.data.profilePic} alt="profile"/>
            <span className="naming">{user.data.name}&#x25BE;</span>
        </div>
    </div>
);

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    toggleDropdownHidden: () => dispatch(toggleDropdownHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);