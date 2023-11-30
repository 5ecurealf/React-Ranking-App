import { useState } from 'react';
import RankItems from "./RankItems.js";

const RankingItemContainer = ({ dataType, imgArr }) => {
    const albumLocalStorageKey = "albums";
    const movieLocalStorageKey = "movies";

    var localStorageKey = "";

    const [albumItems, setAlbumItems] = useState(JSON.parse(localStorage.getItem(albumLocalStorageKey)));
    const [movieItems, setMovieItems] = useState(JSON.parse(localStorage.getItem(movieLocalStorageKey)));

    var data = [];
    var setFunc = null;

    // select the storage key and funciton based on the type of the data
    if (dataType === 1) {
        data = movieItems;
        setFunc = setMovieItems;
        localStorageKey = movieLocalStorageKey;
    } else if (dataType == 2) {
        data = albumItems;
        setFunc = setAlbumItems;
        localStorageKey = albumLocalStorageKey;
    }
    return (
        <RankItems items={data} setItems ={setFunc} dataType={dataType} imgArr={imgArr} localStorageKey={localStorageKey }/>
    )
}

export default RankingItemContainer;
