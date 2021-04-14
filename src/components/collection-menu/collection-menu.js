import React, { useEffect } from "react";
import './collection-menu.scss';
import { fetchCollection } from '../../redux/collection/collection.action';
import { connect } from 'react-redux'; 

const CollectionMenu = ({ fetchData, fetchCollection }) => {  
    
  useEffect(() => {
    fetchCollection();
    // eslint-disable-next-line
  }, []);

  const userClicked = (i) => {  
    if(i.Title === "Business" || "News" || "Technology" || "Sports" || "Health" || "Entertainment") {
      localStorage.setItem('user-clicked', i.Title);
      return window.open('/business',"_self")
    } 
}

  return fetchData.error ? (
    <h2>{fetchData.error}</h2>
  ) : (
    <div className="categories">
      <h2 className="title" id="read-posts">Trending Categories</h2>
      <div className="container">
        {fetchData.collection.map(item => 
          <p key={item.objectId} className="category" onClick={() => userClicked(item)}>{item.Title}</p>)}
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  fetchData: state.collection
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollection: () => dispatch(fetchCollection())
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionMenu);