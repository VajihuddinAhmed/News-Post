import React from 'react';
import { Link } from 'react-router-dom';
import './dropdown.scss';
import { Logout } from '../../redux/user/user.actions';
import { useDispatch } from "react-redux";
import { toggleDropdownHidden } from '../../redux/dropdown/dropdown.actions';
import { connect } from 'react-redux';

const Dropdown = ({ toggleDropdownHidden }) => {
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(Logout());
  };

    return (
        <div className="dropdown">
            <div className="items">
                <Link to="/writenews" onClick={toggleDropdownHidden} className="item">Write posts</Link>
                <Link to="#" className="item">Your posts</Link>
                <Link to="/" onClick={() => {
                    logOut()
                    dispatch(toggleDropdownHidden)
                }} className="item">Log out</Link>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    toggleDropdownHidden: () => dispatch(toggleDropdownHidden())
})

export default connect(null, mapDispatchToProps)(Dropdown);