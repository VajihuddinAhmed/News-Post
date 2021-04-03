import React, { useState } from 'react';
import './write-post.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

const WritePost = ({ user }) => {

    const [category, setCategory] = useState('')
    const [selectedFile, setSelectedFile] = useState('');
    let [newPost, setNewPost] = useState({
        Title: '',
        Source: '',
        Details: '',
        Category: '',
        Image: '',
        ownerId: ''
    })

    const url = "https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/data/NewsPostAPI";

    const fetchData = async () => {
        newPost.Image = localStorage.getItem('photo')
        newPost.ownerId = localStorage.getItem('id')
        newPost.Category = localStorage.getItem('categ')
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': '4D9C57D7-5389-40E5-AB49-744270229B82'
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
        setSelectedFile(e.target.files[0])
    }

    const uploadImage = () => {
        const data = new FormData() 
        data.append('test', selectedFile)
        let imgUrl = `https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/files/${category}/${selectedFile.name}?overwrite=true`;
        console.log(selectedFile.name)
        localStorage.setItem('photo', `https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/files/${category}/${selectedFile.name}`);
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
            <div className="write-container">
                <div className="write-news">
                    <h1 className="heading">Write your post</h1>
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
                            <textarea name="Details" value={Details} onChange={handleChange} rows="35" cols="100"/>
                        </div>
                        <div>
                            <h3>Image</h3>
                            <input className="file" type="file" name="selectedFile" onChange={uploadHandleChange} required />
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