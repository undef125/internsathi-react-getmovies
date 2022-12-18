import React from 'react';
import Search from "../components/HomePage/Search";
import Movies from "../components/HomePage/Movies";
import { useState } from 'react';

export default function HomePage() {

    const [search, setSearch] = useState("spider man"); //omdb doesnot provide random movie so initially i set it up to search spiderman

    return (
        <>
            <Search setSearch={setSearch} />
            <Movies search={search} />
        </>
    )
}
