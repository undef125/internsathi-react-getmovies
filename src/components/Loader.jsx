import React from 'react'
import { MagnifyingGlass } from "react-loader-spinner";
import "./loader.css";

export default function Loader() {
    return (
        <div className="loadercontainer">
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor='#c0efff'
                color='#e15b64'
            />
        </div>
    )
}
