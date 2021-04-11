import React, { useState, useEffect } from "react";
import './entertainment-page.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

const EntertainmentPage = ({ user }) => {
    const [hasErrors, setErrors] = useState(false);
    const [collections, setCollections] = useState([]);
    const url = "https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/data/NewsPostAPI?pageSize=100";
    console.log(hasErrors)
  
      const fetchData = async () => {
          const res = await fetch(url, {
              headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
              }
          });
          res
            .json()
            .then(res => {
                const filteredEntertainmentPosts = res.filter((item) => {
                    return item.Category === "Entertainment"
                })
                setCollections(filteredEntertainmentPosts)
            })
            .catch(err => setErrors(err));
        }
      
        useEffect(() => {
          fetchData();
        }, []);

        const onPostClick = (item) => { 
            localStorage.setItem('myItems', JSON.stringify(item))
            return user ? <Link to={{pathname: "/details", collections: item }} /> : window.open('/signin',"_self")
        }

        return (
            <div className="entertainment-page">
            {
                collections.map((item, i) => (
                    <Link key={i + 628} to={{pathname: "/details", collections: item }}>
                        <div key={i + 10} className="section" onClick={() => onPostClick(item)}>
                                    <p className="source">
                                        {item.Source}
                                    </p>
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
          )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(EntertainmentPage);