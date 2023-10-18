import { movieCard } from "../component/movieCard.js";
import { apiFetch } from "./instance.js";


export const movieGenresList = async() => {
  try{
      const response = await apiFetch.get('https://api.themoviedb.org/3/genre/movie/list?language=ko-KR')
      return response;
    }catch(err){
      console.log('에러',err)
    }
}

export const mainMovie = async () => {
    try{
      const response = await apiFetch.get('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1')
      
      movieCard(response.results)
    }catch(err){
      console.log('에러',err)
    }
}

export const movieDetail = async (movieId) => {
  try{
    const response = await apiFetch.get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=ko-KR`)
    
    return response;
  }catch(err){
    movieDetail(movieId)
    console.log(err);
  }
}

export const movieVideo = async (movieId) => {
  try{
    const response = await apiFetch.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`)
    
    return response;
  }catch(err){
    movieVideo(movieId)
  }
}

export const movieSearch = async (query) => {
  try{
    const response = await apiFetch.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`)
    
    movieCard(response.results)
  }catch(err){
    movieVideo(movieId)
  }
}

if(document.querySelector('.main-section').children.length === 0) mainMovie();

