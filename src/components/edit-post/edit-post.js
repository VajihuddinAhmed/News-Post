import React, { useState } from 'react';
import './edit-post.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const EditPost = ({ user }) => {

    const [category, setCategory] = useState('')
    const [selectedFile, setSelectedFile] = useState('');
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);

    const tt = localStorage.getItem('tt')
    const tt1 = localStorage.getItem('tt1')
    const tt2 = localStorage.getItem('tt2')
    const tt3 = localStorage.getItem('tt3')
    const tt4 = localStorage.getItem('tt4')
    const tt5 = localStorage.getItem('tt5')
    const tt6 = localStorage.getItem('tt6')

    let [editPost, setEditPost] = useState({
        Title: tt,
        Source: tt1,
        Details: tt2,
        Category: tt3,
        Image: tt4,
        ownerId: tt5
    })

    const url = `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/NewsPostAPI/${tt6}`;

    const fetchData = async () => {
        editPost.Image = localStorage.getItem('photo')
        editPost.ownerId = localStorage.getItem('id')
        editPost.Category = localStorage.getItem('categ')
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
              },
            body: JSON.stringify(editPost),
        });
        res.json()
          .then(res => {
            alertify.set('notifier','position', 'top-center');
            alertify.notify('Edited Post Successfully', 'success', 3, function(){'dismissed'});
            localStorage.setItem('tt', res.Title)
            localStorage.setItem('tt1', res.Source)
            localStorage.setItem('tt2', res.Details)
            localStorage.setItem('tt3', res.Category)
            localStorage.setItem('tt4', res.Image)
            localStorage.setItem('tt5', res.ownerId)

          })
          .catch(err => console.log(err));
      }

     const { Title, Source, Details } = editPost

    const handleSubmit = async (e) => {
        e.preventDefault()
        localStorage.setItem('id', user.data.ownerId)
        uploadImage();
        setTimeout (() => {
            fetchData();
        },2000)
        window.scrollTo(0, 0);
    }
    const { Business, News, Sports, Health, Technology, Entertainment } = category

    const handleDropDownChange = (e) => {
        if(e.target.value === 'Business' || 'Sports' || 'Entertainment' || 'News' || 'Health' || 'Technology') {
            const selectedCategory = e.target.value
            localStorage.setItem('categ', selectedCategory)
            setCategory(selectedCategory)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditPost({ ...editPost, [name]: value }) 
    }

    
    const uploadHandleChange = (e) => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setPicture(picture)
        }
        setSelectedFile(e.target.files[0])
    }

    const uploadImage = () => {
        const data = new FormData() 
        data.append('test', selectedFile)
        let imgUrl = `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/files/newspost/${selectedFile.name}?overwrite=true`;
        if(selectedFile.name === undefined) {
            localStorage.setItem('photo', tt4);
        } else {
            localStorage.setItem('photo', `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/files/newspost/${selectedFile.name}?overwrite=true`);
        }
        
        fetch(imgUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
              },
            body: data,
        })
          .then(res => {
            setSelectedFile(res.url);
          })
          .catch(err => console.log(err));
    }

	return (
            <div className="editpost-container">
                <div className="write-news">
                    <h1 className="heading">Edit post</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <h3>Category</h3>
                            <select className="select" value={tt3} onChange={handleDropDownChange}>
                            <option value={Business}>Business</option>
                            <option value={News}>News</option>
                            <option value={Sports}>Sports</option>
                            <option value={Technology}>Technology</option>
                            <option value={Health}>Health</option>
                            <option value={Entertainment}>Entertainment</option>
                            </select>
                        </div>
                        <div>
                            <h3>Title</h3>
                            <input type="text" name="Title" value={Title} onChange={handleChange} required className="title"/>
                        </div>
                        <div>
                            <h3>Source</h3>
                            <input type="text" name="Source" value={Source} onChange={handleChange} required className="source" />
                        </div>
                        <div>
                            <h3>Details</h3>
                            <textarea name="Details" value={Details} className="text-area" onChange={handleChange} />
                        </div>
                        <div className="imageSection">
                            <div>
                                <h3>Image</h3>
                                <input className="file" type="file" name="selectedFile" onChange={uploadHandleChange} />
                            </div>
                            <div className="imagett">
                                {
                                    imgData === null ? <img alt="images" src={tt4} className="writeImage" /> : <img alt="images" src={imgData} className="writeImage" />
                                }
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

export default withRouter(connect(mapStateToProps)(EditPost));