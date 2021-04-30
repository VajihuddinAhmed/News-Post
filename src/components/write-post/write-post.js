import React, { useState } from 'react';
import './write-post.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const WritePost = ({ user }) => {

    const [category, setCategory] = useState('')
    const [selectedFile, setSelectedFile] = useState('');
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
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
              if(res === 200) return
            alertify.set('notifier','position', 'top-center');
            alertify.notify('Posted Successfully', 'success', 3, function(){'dismissed'});
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
        },1000)

        setNewPost({ Title: '', Source: '', Details: '' })
        setSelectedFile('')
        e.target.reset()
        window.scrollTo(0, 0);

    }

    const { Business, News, Sports, Health, Technology, Entertainment } = category

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewPost({ ...newPost, [name]: value }) 
    }

    const handleDropDownChange = (e) => {
        if(e.target.value === 'Business' || 'Sports' || 'Entertainment' || 'News' || 'Health' || 'Technology') {
            const selectedCategory = e.target.value
            localStorage.setItem('categ', selectedCategory)
            setCategory(selectedCategory)
        }
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
        localStorage.setItem('photo', `https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/files/newspost/${selectedFile.name}`);
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
            <div className="writepost-container">
                <div className="write-news">
                    <h1 className="heading">Write post</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <h3>Category</h3>
                            <select className="select" onChange={handleDropDownChange} >
                            <option defaultValue>Select Category</option>
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
                            <input type="text" name="Title" value={Title} onChange={handleChange} required className="title" />
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
                                    imgData === null ? undefined : <img alt="images" src={imgData} className="writeImage" />
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

export default connect(mapStateToProps)(WritePost);