import React, { useState } from 'react';
import './sign-in.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { Login } from '../../redux/user/user.actions';
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

const SignIn = (props) => {

    const [userCredentials, setCredentials] = useState({ login: '', password: '' })
    const { login, password } = userCredentials
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(
            Login(login, password))
            .then(() => {
            let visited = localStorage.getItem('user-clicked');
            if(visited) {
            props.history.push(`/business`);
            } else {
            props.history.push('/');
            }
            })
            .catch(() => {
            setLoading(!loading);
            setErrorMsg(!errorMsg)
        });
            
        setCredentials({ login: '', password: '' })
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setCredentials({ ...userCredentials, [name]: value })
    }

    return (

        <div className="sign-in">
            {errorMsg ? <span className="errorMsg">Invalid email or password</span> : null}
            <h2 className="title">I already have an account</h2>
            <span className="subtitle">Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="login" 
                    type="email" 
                    value={login} 
                    handleChange={handleChange} 
                    label="Email" 
                    required 
                />
                
                <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    handleChange={handleChange} 
                    label="Password" 
                    required 
                />
                
                <div className="button">
                    <CustomButton type="submit">SIGN IN</CustomButton>
                </div>
            </form>
            
        </div>
    )
}

export default withRouter(SignIn);