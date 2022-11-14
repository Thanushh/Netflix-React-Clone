import React, { useState, useEffect } from 'react'
import axios from '../../axios'
import requests from '../../requests'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie (
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            )
        }
        fetchData()
    }, [])

    const style = {
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n -1) + '...' : str
    }  //for making the description shorter

  return (
    <header className='banner' style={style}>
        <div className="banner__contents">
            <h1 className='banner__title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className="banner__buttons">
                <button className="banner__button"><i class="fa-solid fa-play"></i>Play</button>
                <button className="banner__button">More info</button>
            </div>

            <h1 className="banner__description">
                {truncate(movie?.overview, 150)}
            </h1>
        </div>

        <div className='banner__fadeBottom'/>
    </header>
  )
}

export default Banner