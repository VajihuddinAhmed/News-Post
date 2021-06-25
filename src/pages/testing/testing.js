import React, { useState, useEffect } from "react";

const TestingComponent = () => {
   
    const [collections, setCollections] = useState([]);
    const url = "https://rest-rct.cceaf.fr/notifications";

    const fetchData = async () => {
        const res = await fetch(url, {
            headers: {
              'Content-Type': 'application/json',
            }
        });
        res
          .json()
          .then(res => {
              console.log(res)
              setCollections(res)
              return res;
          })
      }

      useEffect(() => {
        fetchData();
      }, []);

    return (
        <div>
            <p>{collections[0].text}</p>
        </div>
    )
}

export default TestingComponent;