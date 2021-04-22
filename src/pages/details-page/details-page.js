import React, { useState, useEffect } from 'react';
import './details-page.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { fetchDelete } from '../../redux/deletePost/deletePost.action';
import { fetchNewsPost } from '../../redux/category/category.action';
import { withRouter } from "react-router-dom";
import OptionModal from '../../components/optionModal/optionModal';
import { Link } from 'react-router-dom';

const DetailsPage = ({ user, fetchDelete, history, fetchNewsPost, newsPost }) => {
    const collections = JSON.parse(localStorage.getItem('myItems'))
    const { Image, Source, Title, Details, ownerId } = collections
    const currentUser = user ? ownerId === user.data.ownerId : null

    const [modalState, setModalState] = useState(false)
    const manageState = () => {
        setModalState(!modalState)
    }
    
    const deletedPost = () => {
        fetchDelete();
        return history.push({pathname: '/posts', deleted: true})
    }

    const goToEditPage = () => {
        localStorage.setItem('tt', collections.Title)
        localStorage.setItem('tt1', collections.Source)
        localStorage.setItem('tt2', collections.Details)
        localStorage.setItem('tt3', collections.Category)
        localStorage.setItem('tt4', collections.Image)
        localStorage.setItem('tt5', collections.ownerId)
        localStorage.setItem('tt6', collections.objectId)
        
    
        return history.push({
            pathname: '/editpost',
            data: collections
          })
    }

    const handleCloseModal = () => {
        setModalState(false)
    }

    const onPostClick = (item) => {
        localStorage.setItem('myItems', JSON.stringify(item))
        window.scrollTo(0, 0);
        return  <Link to={{pathname: "/details", collections: item }} />
    }

    useEffect(() => {
        fetchNewsPost();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className="details-container">
            <div className="details-page">
                {
                    currentUser ? 
                    <div className="update">
                        <button className="editPost" onClick={goToEditPage}>EDIT POST</button>
                        <button className="deletePost" onClick={() => manageState()}>DELETE POST</button>
                    </div> 
                    : null
                }
                <h1 className="title">{Title}</h1>
                <h3 className="source">{Source}</h3>
                <img alt="display" src={Image} className="image"/>
                <p className="para">{Details}</p>
            </div>
            <div className="post--written__section">
                <div className="post--written">
                    <div>
                        {collections.ownerId ? <img alt="pic" src={user.data.profilePic} style={{ width: "140px", height:"140px", borderRadius: "50%", marginTop: "1.4rem", border: "5px solid #c4c0c0"}} /> : <img alt="pic" src="../../assets/profile.png" style={{ width: "140px", height:"140px", borderRadius: "50%", marginTop: "1.4rem", border: "1px solid #c4c4c0"}} />}
                    </div>
                    <div>
                        <h5>WRITTEN BY -</h5>
                        <h3 className="author">{collections.ownerId ? user.data.name : <p>Unknown Author</p>}</h3>
                        <h5 className="about-user">{collections.ownerId ? user.data.about : <p>Unknown</p>}</h5>
                        <h5 className="tweet">{collections.ownerId ? <p>Follow on Twitter: <Link to="#">{user.data.twitter}</Link></p> : <p>Unknown</p>}</h5>
                    </div>
                </div>
            </div>
            <h2 className="sponsored">Other Related Articles :-</h2>
            <div className="sponsored--section">
                {
                    newsPost.category.map((item, i) => (
                        <Link key={i + 628} to={{pathname: "/details", collections: item }}>
                        <div onClick={() => onPostClick(item)}>
                            <div>
                                <img alt="images" src={item.Image} style={{ width: '200px', height: '120px'}}/>
                            </div>
                            <div className="title">
                                <p>{item.Title}</p>
                            </div>   
                        </div>
                        </Link>
                    ))
                }
            </div>
            <OptionModal modalState={modalState} handleCloseModal={handleCloseModal} deletedPost={deletedPost} />
        </div>
    )
}

const mapStateToProps = state => ({
    newsPost: state.category,
    user: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    fetchDelete: () => dispatch(fetchDelete()),
    fetchNewsPost: () => dispatch(fetchNewsPost())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));