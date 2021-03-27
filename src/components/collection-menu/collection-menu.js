import React, { useState, useEffect } from "react";
import './collection-menu.scss';

const CollectionMenu = () => {
  const [hasErrors, setErrors] = useState(false);
  console.log(!hasErrors)
  const [collections, setCollections] = useState([]);
  const url = "https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/data/sectionsAPI";

    const fetchData = async () => {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'REST-API-Key': '4D9C57D7-5389-40E5-AB49-744270229B82'
              }
        });
        res
          .json()
          .then(res => setCollections(res))
          .catch(err => setErrors(err));
      }
    
      useEffect(() => {
        fetchData();
      }, []);

      const test = (i) => {  
        if(i.Title === "Business") {
          localStorage.setItem('user-clicked', i.Title);
          return window.open('/business',"_self")
        } else if(i.Title === "News") {
          localStorage.setItem('user-clicked', i.Title)
          return window.open('/news',"_self")
        } else if(i.Title === "Entertainment") {
          localStorage.setItem('user-clicked', i.Title)
          return window.open('/entertainment',"_self")
        } else if(i.Title === "Sports") {
          localStorage.setItem('user-clicked', i.Title)
          return window.open('/sports',"_self")
        } else if(i.Title === "Technology") {
          localStorage.setItem('user-clicked', i.Title)
          return window.open('/technology',"_self")
        } else if(i.Title === "Health") {
          localStorage.setItem('user-clicked', i.Title)
          return window.open('/health',"_self")
        }
      }

  return (
    <div className="categories">
      <h2 className="title">Trending Categories</h2>
      <div className="container">
        {
          collections.map(item => (
            <p key={item.objectId} className="category" onClick={() => test(item)}>
                {item.Title}
            </p>
        ))
        }
      </div>
    </div>
  )
};
export default CollectionMenu;