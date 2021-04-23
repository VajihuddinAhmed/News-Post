import React, { useState, useEffect } from 'react';
import './details-page.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { fetchDelete } from '../../redux/deletePost/deletePost.action';
import { fetchNewsPost } from '../../redux/category/category.action';
import { withRouter } from "react-router-dom";
import OptionModal from '../../components/optionModal/optionModal';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../redux/allUsers/allUsers.action';

const DetailsPage = ({ user, fetchDelete, history, fetchNewsPost, newsPost, roman, fetchAllUsers }) => {
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
        fetchAllUsers()
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);
    const postWriter = roman.allUsers.find((item) => item.ownerId === collections.ownerId)
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
                        {
                            roman.allUsers.find((item) => item.ownerId === collections.ownerId) ? 
                            <img alt="pic" src={postWriter.profilePic} style={{ width: "140px", height:"140px", borderRadius: "50%", marginTop: "1.4rem", border: "5px solid #c4c0c0"}} /> 
                            : null
                        }
                    </div>
                    <div>
                        <h5>WRITTEN BY -</h5>
                        <h3 className="author">{roman.allUsers.find((item) => item.ownerId === collections.ownerId) ? 
                            postWriter.name 
                            : null}</h3>
                        <h5 className="about-user">{roman.allUsers.find((item) => item.ownerId === collections.ownerId) ? 
                            postWriter.about
                            : null}</h5>
                        <h5 className="tweet">{roman.allUsers.find((item) => item.ownerId === collections.ownerId) ? 
                            <p>Follow on Twitter: <Link to="#">{postWriter.twitter}</Link></p>
                            : null}</h5>
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
    roman: state.allUsers,
    user: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    fetchDelete: () => dispatch(fetchDelete()),
    fetchNewsPost: () => dispatch(fetchNewsPost()),
    fetchAllUsers: () => dispatch(fetchAllUsers())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));