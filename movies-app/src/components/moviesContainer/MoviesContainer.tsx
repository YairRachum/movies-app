import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import MovieModal from "../movieModal/MovieModal";
import SearchBox from "../searchbox/SearchBox";

export default function Movies() {

    //States
    const [moviesArray, setMoviesArray] = useState([]);
    const [searchValue, setSearchValue] = useState("star wars");
    const [isShown, setIsShown] = useState(false);
    const [tempMovieDetails, setTempMovieDetails] = useState([]);

    const getMovies = async () => {
        if (searchValue === "") {
            return
        }
        await axios.post(`http://localhost:3001/movies/search`, { searchValue: searchValue }).then(data => {
            if (data.data) {
                setMoviesArray(data.data)
            }
        })
    }

    //CallBack when the user clicks on a movie card
    const onMovieClickedHandler = (movie: any) => {
        setTempMovieDetails(movie)
        setIsShown(true)
    }

    //This happens on page load
    useEffect(() => {
        getMovies()
    }, [searchValue])

    return (
        <div>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="movies-container">
                {moviesArray.map((movie: any, key: number) => (
                    <div key={key} className="movie-card" onClick={() => onMovieClickedHandler(movie)} >
                        <img src={movie.Poster} alt="movie poster" />
                    </div>
                ))}
            </div>
            {(isShown && <MovieModal movie={tempMovieDetails} setIsShown={setIsShown} isShown={isShown} />)}
        </div>
    )

}