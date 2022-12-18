import React, { useRef } from "react";
import "./search.css"

export default function Search({ setSearch }) {
    
    const searchRef = useRef(null);

    return (
        <div className="searchholder">
            <div className="searchbarcontainer">
                <div className="movieinputholder">
                    <input type="text" ref={searchRef} onKeyDown={e => {
                        if (e.key === 'Enter') {
                            setSearch(searchRef.current.value);
                        }
                    }} />
                </div>
                <div className="searchiconholder" onClick={() => {
                    setSearch(searchRef.current.value);
                }}>
                    <img src="/search.png" alt="search icon to search for movies with movies name" />
                </div>
            </div>
        </div>
    )
}