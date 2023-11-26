import React, { useState, useEffect } from 'react';

const RankItems = () => {
    // item array set as empty by default denoted by the empty square brackets
    // want items to be populated after the component calls the data from the server
    const [items, setItems] = useState([]);
    const dataType = 1;

    useEffect(() => {
        fetch(`Item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, []);

    return (
        <main>
            {
                (items.length > 0) ? items.map((item) => <h3>{item.title}</h3>):<div>Loading ...</div>
            }
        </main>
    )
}

export default RankItems
