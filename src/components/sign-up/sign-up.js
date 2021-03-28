import React, { useState } from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import './sign-up.scss';

const SignUp = () => {
    
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })

    const url = "https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/users/register";

    const fetchData = async () => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': '4D9C57D7-5389-40E5-AB49-744270229B82'
              },
            body: JSON.stringify(userCredentials),
        });
        res
          .json()
          .then(userCredentials => {
            console.log('Success:', userCredentials);
          })
          .catch(err => console.log(err));
      }

    const { name, email, password } = userCredentials

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetchData();

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

export default SignUp;