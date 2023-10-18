


const findDirector = (arr) => {
  const res = arr.find((crew) => crew.job === "Director");
  return res.name;
}

export const detailPage = (detail) => {
  console.log('디테일!',detail)
  const {release_date,runtime,status,tagline,title,video,genres,overview,credits,backdrop_path} = detail;

  let html;
  html = `
  <div class="detail-container">
    <div class="content">
      <div class="detail-backdrop">
        <img src="https://image.tmdb.org/t/p/original${backdrop_path}" alt="포스터">
      </div>
      <div class="info">
        <h1 class="title">${title ? title.replace(/[:\n]/g,':<br>') : original_title}</h1>
        <div class="desc">
          <p class="genres">장르: ${genres.map((genre) => genre.name)}</p>
          <p class="release">개봉 연도: ${release_date.slice(0,4)}</p>
          <p class="director">감독: ${findDirector(credits.crew)}</p>
          <p class="actor">출연 배우: ${credits.cast[0].original_name}, ${credits.cast[1].original_name}, ${credits.cast[2].original_name}</p>
          <p class="overview">${overview.replace(/[ ][ ]/g,'<br>')}</p>
        </div>
      </div>
      <div class="use">
        <button class="use-button" role="button">미리 보기</button>
      </div>
    </div>
    <section class="related">
      <h2>관련 영화</h2>
      <!-- 관련 영화 목록 -->
    </section>
    <section class="reviews">
      <h2>리뷰</h2>
      <!-- 리뷰 목록 -->
    </section>
  </div>
  `
  
  document.querySelector('.main-section').innerHTML = html;
}