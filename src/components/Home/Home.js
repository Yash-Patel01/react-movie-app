import React, {useEffect} from 'react';
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from 'react-redux';
import {fetchAsyncMovies, fetchAsyncShows} from '../../features/movies/movieSlice';

const Home = () => {
    const dispatch = useDispatch();
    console.log(dispatch)
    useEffect(() => {
        dispatch(fetchAsyncMovies());
        dispatch(fetchAsyncShows());
    },[dispatch]);
     
    return (
        <div>
            <div className="banner-image">
            </div>
            <MovieListing></MovieListing>
        </div>
    );
};

export default Home;