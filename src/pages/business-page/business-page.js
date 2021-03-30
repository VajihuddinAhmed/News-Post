import React, { useState, useEffect } from "react";
import './business-page.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

const BusinessPage = ({ user }) => {
    const [hasErrors, setErrors] = useState(false);
    const [collections, setCollections] = useState([]);
    const url = "https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/data/NewsPostAPI?pageSize=100";
    console.log(hasErrors)
  
      const fetchData = async () => {
          const res = await fetch(url, {
              headers: {
                  'Content-Type': 'application/json',
                  'REST-API-Key': '4D9C57D7-5389-40E5-AB49-744270229B82'
                }
          });
          res
            .json()
            .then(res => {
                const filteredBusinessPosts = res.filter((item) => {
                    return item.Category === "Business"
                })
                setCollections(filteredBusinessPosts)
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
            <div className="business-page">
            {
                collections.map((item, i) => (
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
          )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(BusinessPage);