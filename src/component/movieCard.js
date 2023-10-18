import { movieDetail, movieGenresList } from "../js/movie.js";


const findGenres = (arr,genresId) => {
  const res = arr.genres.find((cate) => cate.id === genresId);

  return res.name;
}

export const movieCard = async(movieList) => {
    const genresList = await movieGenresList();

    const html = await Promise.all(
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

    document.querySelector('.main-section').innerHTML = html.join("");
        const movieCardDoms = document.querySelectorAll('.movie-card')
    
    movieCardDoms.forEach((dom) => {
      dom.addEventListener("click",(event)=>{
        // event.currentTarget.getAttribute('data-id')
        console.log(event.currentTarget.getAttribute('data-id'))
      })
    })

    console.log('무비카드',movieCardDoms)
  
}