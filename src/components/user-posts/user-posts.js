import React, { useEffect, useState } from "react";
import './user-posts.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { fetchPosts } from '../../redux/userPosts/userPosts.action';
import { Link, withRouter } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const UserPosts = ({ user, allPosts, fetchPosts, location }) => {

    useEffect(() => {
        if(location.deleted === true) {
            alertify.set('notifier','position', 'top-center');
            alertify.notify('Deleted Post Successfully', 'success', 3, function(){'dismissed'});
            setTimeout(() => {
                window.location.reload();
            }, 2000)   
        }
        fetchPosts();
        // eslint-disable-next-line
    }, []);

    const onPostClick = (item) => { 
        localStorage.setItem('myItems', JSON.stringify(item))
        return user ? <Link to={{pathname: "/details", collections: item }} /> : window.open('/signin',"_self")
    }

    const [sorted, setSorted] = useState('')

    const sorting = e => {
        let sortingBy = e.target.value
        setSorted(sortingBy)
    }

    const [searchTerm, setSearchTerm] = useState('')

    return allPosts.error ? (
        <h2>{allPosts.error}</h2>
      ) : (
        <div className="user-posts">
            <div>
                <div className="sorting-section">
                    <div>
                        <input type="text" className="filter" placeholder="&#128269; Search for ..." onChange={e => {setSearchTerm(e.target.value)}} />
                    </div>
                    <select onChange={sorting} className="sorting">
                        <option>Sort by</option>
                        <option value="recently">Recently Added</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                {
                    [...allPosts.userposts].sort((a, b) => {
                        if (sorted === "recently") {
                            return a.created < b.created ? 1 : -1 
                        }
                        if (sorted === "oldest") {
                        return a.created > b.created ? 1 : -1 
                        }
                        return 0;
                    }).filter((val) => {
                        return searchTerm === "" ? val : null || (val.Title.toLowerCase().includes(searchTerm.toLowerCase()) || val.Details.toLowerCase().includes(searchTerm.toLowerCase())) ? val : null
                    }).map((item, i) => (
                        <Link key={i + 628} to={{pathname: "/details", collections: item }}>
                            <div key={i + 10} className="section" onClick={() => onPostClick(item)}>
                                    <p className="source">{item.Source}</p>
                                    <div key={i + 19} className="container">
                                        <div key={i + 89}>
                                            <div key={i + 176} className="title">
                                                <p>
                                                {item.Title}
                                                </p>
                                            </div>
                                            <div key={i + 34} className="box">
                                                <p>
                                                {item.Details}
                                                </p>
                                            </div>
                                        </div>
                                        <div key={i + 543} className="image">
                                            <img alt="images" src={item.Image} style={{ width: '300px', height: '180px'}}/>
                                        </div>
                                    </div>
                                    <p key={i + 870} className="timestamp">{new Date(item.created).toDateString()}</p>    
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
        )
}

const mapStateToProps = state => ({
    allPosts: state.userposts,
    user: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPosts));