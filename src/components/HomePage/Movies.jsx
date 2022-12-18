import React, { useState, useEffect } from "react";
import axios
    from "axios";
import "./movies.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";

export default function Movies({ search }) {

    const [movies, setMovies] = useState([]);
    const [notFound, setnotFound] = useState(true);
    const [error, seterror] = useState(false);
    const [loading, setLoading] = useState(false);

    const getMovies = async (name) => {
        setLoading(true);
        try {
            let response = await axios.get(`http://www.omdbapi.com/?apikey=cf45b04&s=${name}`);
            setMovies(response.data.Search);
            response.data.Response === "False" ? setnotFound(true) : setnotFound(false);
            seterror(false);
        } catch (error) {
            setnotFound(false)
            seterror(true);
            console.log("error calling api!!")
        }
        setLoading(false)
    }


    useEffect(() => {
        getMovies(search);
    }, [search]);

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) :
                    error ? (
                        <h2 className="notice"> Error calling API </h2>
                    ) : notFound ? (
                        <h2 className="notice"> No data found check with that name </h2>
                    ) : (
                        <div className="moviespagecontainer">
                            <div className="moviescontainer">
                                {movies.map(movie => (
                                    <Link to={`/details/${movie.Title.includes("/") ? movie.Title.split("/").join("$$") : movie.Title}`} key={movie.imdbID}>
                                        <div className="singlemovie" >
                                            <div className="movieimageholder">
                                                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" />
                                            </div>
                                            <div className="movielittledetailholder">
                                                <h3>{movie.Title}</h3>
                                                <p>Released: {movie.Year}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
            }
        </>

    )
}