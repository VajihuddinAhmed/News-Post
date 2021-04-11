import React, { useState } from 'react';
import './edit-profile.scss';
import ProfilePic from '../../assets/profile.png';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const EditProfile = ({ user }) => {

    const [selectedFile, setSelectedFile] = useState('');
    let [newPost, setNewPost] = useState({
        Title: '',
        Source: '',
        Details: '',
        Category: '',
        Image: '',
        ownerId: ''
    })

    const url = "https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/NewsPostAPI";

    const fetchData = async () => {
        newPost.Image = localStorage.getItem('photo')
        newPost.ownerId = localStorage.getItem('id')
        newPost.Category = localStorage.getItem('categ')
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
              },
            body: JSON.stringify(newPost),
        });
        res.json()
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
      }

     const { Title, Source, Details,  } = newPost

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.setItem('id', user.data.ownerId)
        uploadImage();
        setTimeout (() => {
            fetchData();
        },2000)

        setNewPost({ Title: '', Source: '', Details: '' })
        setSelectedFile('')
        e.target.reset()

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewPost({ ...newPost, [name]: value }) 
    }


    const uploadHandleChange = (e) => {
        setSelectedFile(e.target.files)
    }

    const uploadImage = () => {
        const data = new FormData() 
        data.append('test', selectedFile)
        let imgUrl = `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/files/${selectedFile.name}?overwrite=true`;
        console.log(selectedFile.name)
        localStorage.setItem('photo', `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/files/${selectedFile.name}`);
        fetch(imgUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'REST-API-Key': '4D9C57D7-5389-40E5-AB49-744270229B82'
              },
            body: data,
        })
          .then(res => {
            console.log(res);
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
                            <img style={{width: '200px', height: '200px'}} onClick={uploadHandleChange} className="profile" src={ProfilePic} alt="profile pic" name="selectedFile" required />
                        </div>
                        <div className="input-container">
                            <div className="sections">
                                <h3 className="sub-title">Name</h3>
                                <input type="text" name="Title" value={Title} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Email</h3>
                                <input type="email" name="email" value={Source} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Address</h3>
                                <input type="text" name="Source" value={Source} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Twitter</h3>
                                <input type="text" name="Source" value={Source} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Password</h3>
                                <input type="password" name="Source" value={Source} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Confirm Password</h3>
                                <input type="password" name="Source" value={Source} onChange={handleChange} required className="input" />
                            </div>
                            <div className="sections">
                                <h3 className="sub-title">Details</h3>
                                <textarea name="Details" value={Details} className="textarea" onChange={handleChange} rows="5" cols="40"/>
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