import React, { useState } from 'react';
import './subscribe-newsletter.scss';


const SubscribeNewsLetter = () => {
    const [letter, setLetter] = useState({
        email: ''
    })

    const url = "https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/subscriptions";

    const fetchData = async () => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
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
            <h1 className="newsletter">Sign up to our newsletter</h1>
            <p className="parag">Subscribe for fortnightly guides to newspost for <br/> read and write posts on the best news webpage.</p>
            <form className="sign" onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter Your Email" value={email} name="email" className="email" onChange={handleChange} />
                <button className="btn" type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SubscribeNewsLetter;