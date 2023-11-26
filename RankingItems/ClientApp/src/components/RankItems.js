﻿import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages.js'
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
            <div className = "items-not-ranked">
                {
                    (items.length > 0) ? items.map((item) =>
                        <img id={`item-${item.id}`} src={MovieImageArr.find(o => o.id === item.imageId)?.image} />
                    ) : <div>Loading ...</div>
                }
            </div>
        </main>
    )
}

export default RankItems
