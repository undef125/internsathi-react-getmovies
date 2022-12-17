import React from 'react';
import Search from "../components/HomePage/Search";
import Movies from "../components/HomePage/Movies";
import { useState } from 'react';

export default function HomePage() {

    const [search, setSearch] = useState("spider man")

    return (
        <>
            <Search setSearch={setSearch} />
            <Movies search={search} />
        </>
    )
}
