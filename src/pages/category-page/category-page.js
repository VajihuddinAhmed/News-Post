import React, { useEffect } from "react";
import './category-page.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategory } from "../../redux/category/category.action";
import { selectCurrentUser } from '../../redux/user/user.selectors';

const CategoryPage = ({ user, categories, fetchCategory }) => {
      
        useEffect(() => {
            fetchCategory();
            // eslint-disable-next-line
        }, []);

        const onPostClick = (item) => { 
            localStorage.setItem('myItems', JSON.stringify(item))
            return user ? <Link to={{pathname: "/details", collections: item }} /> : window.open('/signin',"_self")
        }
        return categories.error ? (
            <h2>{categories.error}</h2>
          ) : (
            <div className="category-page">
            {
                categories.category.map((item, i) => (
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

const mapStateToProps = state => ({
    categories: state.category,
    user: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
    fetchCategory: () => dispatch(fetchCategory())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);