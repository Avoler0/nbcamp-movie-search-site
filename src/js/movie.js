// 영화 카드 컴포넌트와 API 호출 함수를 가져옵니다.
import { movieCard } from "../component/movieCard.js";
import { apiFetch } from "./instance.js";

// 영화 장르 목록을 가져오는 함수입니다.
export const movieGenresList = async() => {
  try {
    const response = await apiFetch.get('https://api.themoviedb.org/3/genre/movie/list?language=ko-KR')
    return response;
  } catch(err) {
    console.log('에러', err)
  }
}

// 현재 상영 중인 영화 목록을 가져와서 카드를 렌더링합니다.
export const mainMovie = async () => {
  try {
    const response = await apiFetch.get('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1')
    movieCard(response.results)
  } catch(err) {
    console.log('에러', err)
  }
}

// 영화의 상세 정보를 가져오는 함수입니다.
export const movieDetail = async (movieId) => {
  try {
    const response = await apiFetch.get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=ko-KR`)
    return response;
  } catch(err) {
    movieDetail(movieId)
    console.log(err);
  }
}

// 영화의 비디오 정보를 가져오는 함수입니다.
export const movieVideo = async (movieId) => {
  try {
    const response = await apiFetch.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`)
    return response;
  } catch(err) {
    movieVideo(movieId)
  }
}

// 영화를 검색하는 함수입니다.
export const movieSearch = async (query) => {
  try {
    const response = await apiFetch.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=1`)
    movieCard(response.results)
  } catch(err) {
    movieVideo(movieId)
  }
}

// 메인 섹션에 자식 요소가 없을 경우에만 현재 상영 중인 영화를 불러옵니다.
if (document.querySelector('.main-section').children.length === 0) mainMovie();
