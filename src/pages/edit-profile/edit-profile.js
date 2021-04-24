import React, { useState } from 'react';
import './edit-profile.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const EditProfile = ({ user }) => {

    const [selectedFile, setSelectedFile] = useState('');
    const [picture, setPicture] = useState(null);
    console.log(picture)
    const [imgData, setImgData] = useState(null);
    let [newPost, setNewPost] = useState({
        Name: user.data.name,
        Email: user.data.email,
        Location: user.data.location,
        Twitter: user.data.twitter,
        About: user.data.about,
        profilePic: user.data.profilePic,
        ownerId: user.data.ownerId
    })

    const url = `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/users/${user.data.ownerId}`;

    const fetchData = async () => {
        newPost.profilePic = localStorage.getItem('photo')
        newPost.ownerId = localStorage.getItem('id')
        newPost.Category = localStorage.getItem('categ')
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
              },
            body: JSON.stringify(newPost),
        });
        res.json()
          .then(res => {
            console.log(res);
            alertify.set('notifier','position', 'top-center');
            alertify.notify('Profile Edited Successfully', 'success', 3, function(){  console.log('dismissed'); });
          })
          .catch(err => console.log(err));
      }

     const { Name, Email, Location, Twitter, About } = newPost

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.setItem('id', user.data.ownerId)
        uploadImage();
        setTimeout (() => {
            fetchData();
        },2000)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewPost({ ...newPost, [name]: value }) 
    }


    const uploadHandleChange = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
        setSelectedFile(e.target.files[0])
    }

    const uploadImage = () => {
        const data = new FormData() 
        data.append('test', selectedFile)
        let imgUrl = `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/files/users/${selectedFile.name}?overwrite=true`;
        if(selectedFile.name === undefined) {
            localStorage.setItem('photo', user.data.profilePic);
        } else {
            localStorage.setItem('photo', `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/files/users/${selectedFile.name}?overwrite=true`);
        }

        fetch(imgUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
              },
            body: data,
        }).then(res => {
            setSelectedFile(res.url);
          })
          .catch(err => console.log(err));
    }

	return (
            <div className="edit-profile">
                <div className="edit-container">
                    <h1 className="heading">Your Profile</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="profile-container">
                            <div className="imagett">
                                {
                                    imgData === null ? <img className="pic" alt="images" src={user.data.profilePic} style={{ width: '300px', height: '300px'}}/> : <img alt="images" className="pic" src={imgData} style={{ width: '300px', height: '300px'}}/>
                                }
                            </div>
                            <div className="files">
                                <input className="file" type="file" id="getFile" name="selectedFile" onChange={uploadHandleChange} style={{display: "none"}}/>
                                <button className="edit-button" onClick={() => document.getElementById('getFile').click()}>&#x270e;Edit photo</button>
                            </div>
                        </div>
                        <div className="input-container">
                            <div className="sections">
                                <h3 className="sub-title">Name</h3>
                                <input type="text" name="Name" value={Name} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Email</h3>
                                <input type="email" style={{color: 'grey'}} name="Email" value={Email} onChange={handleChange} required className="input" disabled />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Location</h3>
                                <input type="text" name="Location" value={Location} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Twitter</h3>
                                <input type="text" name="Twitter" value={Twitter} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">About Me</h3>
                                <textarea name="About" value={About} className="textarea" onChange={handleChange} rows="5" cols="40"/>
                            </div>
                        </div>
                        <div className="button">
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(EditProfile);