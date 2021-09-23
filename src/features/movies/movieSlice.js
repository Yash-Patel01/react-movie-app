import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import {APIKey} from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', 
    async () => {
        const movieText = "Harry";
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', 
    async () => {
        const seriesText = "Friends";
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${seriesText}&type=series`)
        return response.data;
    }
);

export const fetchMovieOrShowDetail = createAsyncThunk(
    'movies/fetchMovieOrShowDetail', 
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&plot=full`)
        return response.data;
    }
)

const initialState = {
    movies: {},
    shows: {},
    selctedMovieOrShow: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selctedMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending..");
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully");
            return {...state, movies: payload};
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully");
            return {...state, shows: payload};
        },
        [fetchMovieOrShowDetail.fulfilled]: (state, {payload}) => {
            console.log("Fetched Successfully");
            return {...state, selctedMovieOrShow: payload};
        },
    }
});

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selctedMovieOrShow;
export default movieSlice.reducer;