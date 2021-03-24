import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button';
import companyLogo from '../../assets/newspost.png';
import './header.scss';
import Dropdown from '../dropdown/dropdown';
import ProfileIcon from '../profile-icon/profile-icon';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { selectDropdownHidden } from '../../redux/dropdown/dropdown.selectors';

const Header = ({ hidden, user }) => {
    
    return (
        <div className="header">
            <div className="header-img">
                <Link to="/">
                <img style={{width: '72px', height: '50px'}} src={companyLogo} alt="newspost"/>
                </Link>
            </div>
            <div className="header-links">
                { 
                    user ? 
                    <div className={`${user ? "profile-icon" : "opt"} profile-icon`}>
                        <ProfileIcon />
                    </div>
                    
                    :
                    <div className={`${user ? "profile-icon" : "opt"} opt`}>
                        <Link className="option" to="/signin">Log In</Link>
                        <Link to="/signin">
                            <CustomButton>Get Started</CustomButton>
                        </Link>
                    </div>
                }

            </div>
            {hidden ? null : <Dropdown />}
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    hidden: selectDropdownHidden
})

export default connect(mapStateToProps)(Header);