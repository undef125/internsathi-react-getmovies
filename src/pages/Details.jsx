import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./details.css"
import Loader from '../components/Loader';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Details() {

  const [singleMovie, setSingleMovie] = useState({})
  const { moviename } = useParams();
  let correctedMovieName = moviename.includes("$$") ? moviename.split("$$").join("/") : moviename;  //using this because / in movie name giving problem in routing

  const getSingleMovie = async () => {
    try {
      let response = await axios.get(`http://www.omdbapi.com/?apikey=cf45b04&t=${correctedMovieName}`);
      setSingleMovie(response.data);
    } catch (error) {
      console.log("error calling api!!")
    }
  }

  useEffect(() => {
    getSingleMovie();
  }, [])

  return (
    <>
      {
        singleMovie.Title ? (
          <div className='descriptionpagecontainer' >
            <div className="detailsholder">
              <div className="imagecontainer">
              <img src={singleMovie.Poster !== "N/A" ? singleMovie.Poster : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} alt="" />
              </div>
              <div className="detailsaboutmovies">
                <div className="title">
                  {singleMovie.Title}
                </div>
                <div className="type">
                  <span className="head">Type</span>: {singleMovie.Type}
                </div>
                <div className="releasedyear">
                  <span className="head">Released Year</span>: {singleMovie.Released}
                </div>
                <div className="cast">
                  <span className="head">Cast</span>: {singleMovie.Actors}
                </div>
                <div className="rating">
                  {singleMovie?.Ratings?.map(rating => {
                    return (
                      <div className='ratingcontainer' key={rating.Value}>
                        <div className="platform">{rating.Source}</div>
                        {rating.Source === "Internet Movie Database" ? (
                          <img src="/imdb.png" alt="imdb icon" height="30px" />
                        )
                          :
                          rating.Source === "Rotten Tomatoes" ? (
                            <img src="/rot.png" alt="rotten tomatoes icon" height="30px" />
                          ) : rating.Source === "Metacritic" ? (
                            <img src="/meta.png" alt="metacritic icon" height="30px" />

                          ) : null}
                        <div className="rating">{rating.Value}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="runtime">
                  <span className="head">Runtime</span>: {singleMovie.Runtime}
                </div>
                <div className="director">
                  <span className="head">Director</span>: {singleMovie.Director}
                </div>
                <div className="genre">
                  <span className="head">Genre</span>: {singleMovie.Genre}
                </div>
                <div className="summary">
                  <h5>{singleMovie.Plot}</h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )
      }
    </>
  )
}
