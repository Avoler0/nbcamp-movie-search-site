import { detailPage } from "../component/detailPage.js";
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
      console.log('리스폰스',response)
      movieCard(response.results);
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

const temp = async () => {
  const detail = await movieDetail(1008042);
  detailPage(detail);
}

// temp();
mainMovie();

