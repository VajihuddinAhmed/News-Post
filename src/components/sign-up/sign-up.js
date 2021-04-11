import React, { useState } from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import './sign-up.scss';
import { signup } from '../../redux/user/user.actions';
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

const SignUp = (props) => {
    
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name, email, password } = userCredentials;
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(
            signup(email, name, password))
            .then(() => {
            let visited = localStorage.getItem('user-clicked');
            if(visited) {
            props.history.push(`/${visited}`);
            } else {
            props.history.push('/');
            }
            })
            .catch(() => {
            setErrorMsg(!errorMsg)
        });

        setUserCredentials({ name: '', email: '', password: '' })

    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setUserCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <div className="sign-up">
            <h2 className="title">I don't have an account</h2>
            <span className="subtitle">Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput 
                type="text" 
                name="name" 
                value={name} 
                onChange={handleChange} 
                label="Name" 
                required
                />
                <FormInput 
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                label="Email" 
                required
                />
                <FormInput 
                type="password" 
                name="password" 
                value={password} 
                onChange={handleChange} 
                label="Password" 
                required
                />
                <div className="button">
                    <CustomButton type="submit">SIGN UP</CustomButton>
                </div>
            </form>
        </div>
    )
};

export default withRouter(SignUp);