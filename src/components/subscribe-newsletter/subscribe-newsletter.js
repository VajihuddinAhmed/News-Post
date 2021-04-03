import React, { useState } from 'react';
import './subscribe-newsletter.scss';


const SubscribeNewsLetter = () => {
    const [letter, setLetter] = useState({
        email: ''
    })

    const url = "https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/data/subscriptions";

    const fetchData = async () => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': '4D9C57D7-5389-40E5-AB49-744270229B82'
              },
            body: JSON.stringify(letter),
        });
        res.json()
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        fetchData();

        setLetter({ email: ''})

    }

    const { email } = letter 

    const handleChange = (e) => {
        const { name, value } = e.target
        setLetter({ ...letter, [name]: value }) 
    }

    return (
        <div className="subscribe-container">
            <h1>Sign up to our newsletter</h1>
            <p className="parag">Subscribe for fortnightly guides to newspost <br/> for read and write posts on the best news webpage.</p>
            <form className="sign" onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter Your Email" value={email} name="email" className="email" onChange={handleChange} />
                <button className="btn" type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SubscribeNewsLetter;