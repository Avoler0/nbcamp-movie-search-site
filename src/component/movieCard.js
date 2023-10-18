import { movieDetail, movieGenresList } from "../js/movie.js";
import { detailPage } from "./detailPage.js";


const findGenres = (arr,genresId) => {
  const res = arr.genres.find((cate) => cate.id === genresId);

  return res.name;
}

export const movieCard = async(movieList) => {
    let html;
    const genresList = await movieGenresList();
    console.log('무비카드',movieList)
    if(movieList.length === 0){
      html = `
        <div class="not-found-search">
          <div>검색 결과가 없습니다.</div>
        </div>
      `
    }else{
      html = await Promise.all(
        movieList.map(async (list)=>{
          const {id,backdrop_path, title, first_air_date,original_language,genre_ids,release_date,  poster_path,overview} = list;

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
    const div = document.createElement('div');
    div.className = "main-container"

    if(typeof html === "object") div.innerHTML = html.join("");
    if(typeof html === "string") div.innerHTML = html;
    
    document.querySelector('.main-section').innerHTML = null;
    document.querySelector('.main-section').append(div);
    
    document.querySelectorAll('.movie-card').forEach((dom) => {
      dom.addEventListener("click",async (event)=>{
        const movieId = event.currentTarget.getAttribute('data-id');
        const detail = await movieDetail(movieId);

        detailPage(detail);
      })
    })
}