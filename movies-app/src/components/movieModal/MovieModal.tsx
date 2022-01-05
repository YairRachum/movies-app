import axios from "axios";
import React, { useEffect, useState } from "react";


export default function MovieModal(props: any) {
    //State of the current movie modal details
    const [movieDetails, setMoviesDetails]: any = useState({});

    const onCancelClicked = () => {
        props.setIsShown(false);
    }

    //Checking if the movie is stored in cache
    const getMovieInfo = async () => {
        let cachedMovieDetails = sessionStorage.getItem(props.movie.imdbID);
        //if not stored in cache bring the data from the API
        if (!cachedMovieDetails) {
            const url = (`http://localhost:3001/movies/search/${props.movie.imdbID}`);
            await axios.post(url).then(data => {
                if (data.data) {
                    setMoviesDetails(data.data);
                    sessionStorage.setItem(props.movie.imdbID, JSON.stringify(data.data));
                }
            })
        } else {
            //If stored im just showing the information about the movie from the cache
            setMoviesDetails(JSON.parse(cachedMovieDetails))
        }
    }

    //This happens every time the modal is open
    useEffect(() => {
        getMovieInfo();
    }, [])

    return (
        <div className="modalBackground">
            <div className="modalContainer animate__animated animate__backInDown">
                <div className="title">
                    <h5>{props.movie.Title}</h5>
                </div>
                <div className="body">
                    <img src={props.movie.Poster} alt="movie poster" width="200px" />
                    <span>Description:</span> <textarea disabled autoCorrect="off" value={movieDetails.Plot} id=""></textarea>
                    <h6><span>Year:</span> {movieDetails.Year}</h6>
                    <h6><span>Rating:</span> {movieDetails.imdbRating}</h6>
                </div>
                <div className="modalFooter">
                    <button onClick={onCancelClicked} > Cancel</button>
                </div>
            </div>
        </div >
    )
}