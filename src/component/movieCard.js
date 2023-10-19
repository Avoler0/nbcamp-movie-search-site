import { movieDetail, movieGenresList } from "../js/movie.js";
import { detailPage } from "./detailPage.js";

// 장르를 찾는 함수
const findGenres = (arr, genresId) => {
  const res = arr.genres.find((cate) => cate.id === genresId);

  return res.name;
}

// 영화 카드 생성 함수
export const movieCard = async (movieList) => {
  let html;
  const genresList = await movieGenresList();

  // 검색 결과가 없을 때
  if (movieList.length === 0) {
    html = `
      <div class="not-found-search">
        <div>검색 결과가 없습니다.</div>
      </div>
    `
  } else { // 검색 결과가 있을 때
    html = await Promise.all(
      movieList.map(async (list) => {
        const {
          id,
          title,
          genre_ids,
          release_date,
          poster_path,
          overview
        } = list;

        return `
          <div class="movie-card" data-id="${id}">
            <img class="movie-poster" src="https://image.tmdb.org/t/p/original${poster_path}" alt="영화 포스터">
            <h2 class="movie-title">${title.replace(/[:\n]/g,':<br>')}</h2>
            <div class="movie-info">
              <div class="release-date">${release_date} 개봉</div>
              <div class="category">
                ${genre_ids.map((genre) => `<span>${findGenres(genresList,genre)}</span>`).join("")}
              </div>
            </div>
            <div class="movie-overview">${overview.length > 0 ? overview : '줄거리가 없습니다'}</div>
          </div>
        `
      })
    )
  }

  // 새로운 Element Div 생성
  const div = document.createElement('div');
  // 생성한 Div에 클래스 이름 추가
  div.className = "main-container"

  // 검색결과가 있을 때 나온 html을 div에 삽입
  if (typeof html === "object") div.innerHTML = html.join("");
  // 검색결과가 없을 때 나온 html을 div에 삽입
  if (typeof html === "string") div.innerHTML = html;

  // 메인 섹션 초기화
  document.querySelector('.main-section').innerHTML = null;
  // 메인 섹션에 생성했던 Div 추가
  document.querySelector('.main-section').append(div);

  // 영화 카드 클릭 이벤트
  document.querySelectorAll('.movie-card').forEach((dom) => {
    dom.addEventListener("click", async (event) => {
      // 클릭된 요소의 속성 data-id에서 값을 가져옴
      const movieId = event.currentTarget.getAttribute('data-id');

      // 디테일 페이지를 생성하기 위해 해당 영화의 상세 정보를 가져옴
      const detail = await movieDetail(movieId);
      // 디테일 페이지 생성
      detailPage(detail);
    })
  })
}
