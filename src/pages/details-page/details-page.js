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
        return history.push('/posts')
    }

    const goToEditPage = () => {
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