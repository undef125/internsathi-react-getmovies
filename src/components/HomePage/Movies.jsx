import React, { useState, useEffect } from "react";
import axios
    from "axios";
import "./movies.css";
import { Link } from "react-router-dom";

export default function Movies({ search }) {

    const [movies, setMovies] = useState([]);

    const getMovies = async (name) => {
        try {
            let response = await axios.get(`http://www.omdbapi.com/?apikey=cf45b04&s=${name}`);
            setMovies(response.data.Search);
        } catch (error) {
            console.log("error calling api!!")
        }
    }


    useEffect(() => {
        getMovies(search);
    }, [search]);

    return (
        <div className="moviespagecontainer">
            <div className="moviescontainer">
                {movies.map(movie => (
                    <Link to={`/details/${movie.Title}`}>
                        <div className="singlemovie" key={movie.imdbID}>
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