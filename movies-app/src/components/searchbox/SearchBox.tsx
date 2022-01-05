import React from "react";

//Basic searchBox component
export default function SearchBox(props: any) {
    return (
        <div className="search-box">
            <input
                type="text"
                onChange={(event) => props.setSearchValue(event.target.value)}
                placeholder="Search a movie..." />
        </div>
    )
}