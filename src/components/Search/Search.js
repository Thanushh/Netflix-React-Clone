import React, { useState, useEffect } from "react";
import axios from "../../axios";
import './Search.css'
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Search({fetchUrl}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie.name || null, {tmdbId: movie.id})
                .then((url) => {
                    console.log(movie.name)
                    console.log("url is " + url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log("urlParamsn" + urlParams);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="search">
            <h2>Search results</h2>
            <div className="search__wrapper">
                <h3 className="search__title">Explore titles related to:</h3>
                {movies.map((movie) => (
                    <h3 className="search__content">{movie?.title || movie?.name || movie?.original_name}</h3>
                ))}
            </div>


            <div className="search__posters">
                {movies.map((movie) => (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={'search__poster'}
                            src={`${base_url}${ movie.backdrop_path}`}
                            alt={movie.name}
                        />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Search;