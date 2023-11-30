﻿import { useEffect } from 'react';
import RankingGrid from "./RankingGrid.js"
import ItemCollection from "./ItemCollection.js"

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {
    
    // drag function: This function is called when the drag event is initiated.
    // It stores the ID of the draggable item in the dataTransfer object,
    // which can be retrieved later when the item is dropped.
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    // allowDrop function: This function prevents the default behavior of an element.
    // By calling preventDefault, we're indicating that we want to allow a drop
    // action on the target element, overriding the default behavior which typically
    // does not allow dropping.
    function allowDrop(ev) {
        ev.preventDefault();
    }

    // drop function: This function handles the drop event on the target element.
    // It first prevents the default behavior. Then it checks if the target element
    // is an IMG element or already has child nodes. If so, it disallows dropping.
    // If the drop is allowed, it retrieves the ID of the dragged item, updates the
    // ranking property of the item in the items array, and triggers a re-render by
    // updating the state with setItems.
    function drop(ev) {
        ev.preventDefault();
        const targetElm = ev.target;
        // Prevent drop if the target is an image or has children
        if (targetElm.nodeName === "IMG" || targetElm.childNodes.length !== 0) {
            return false;
        }

        // Retrieve the dragged data and update the items array
        var data = parseInt(ev.dataTransfer.getData("text").substring(5));
        const transformedCollection = items.map((item) => (
            item.id === parseInt(data) ?
                { ...item, ranking: parseInt(targetElm.id.substring(5)) } :
                item
        ));

        // Update the state to trigger re-render
        setItems(transformedCollection);
    }


    useEffect(() => {
        fetch(`Item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, [dataType]);

    // save state to local storage everytime item collection state changes in memory 
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(items));
    }, [items]);
    return (
        <main>
            <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop } />
            <ItemCollection items={items} drag={drag} imgArr={imgArr }/>
        </main>
    )
}

export default RankItems;
