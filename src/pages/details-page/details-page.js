import React from 'react';
import './details-page.scss';

const DetailsPage = () => {
    const collections = JSON.parse(localStorage.getItem('myItems'))
    console.log(collections);
    const { Image, Source, Title, Details } = collections

    return (
        <div className="details-container">
            <div className="details-page">
                <h1 className="title">{Title}</h1>
                <h3 className="source">{Source}</h3>
                <img alt="display" src={Image} className="image"/>
                <p className="para">{Details}</p>
            </div>   
        </div>
    )
}

export default DetailsPage;