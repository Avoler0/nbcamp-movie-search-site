// 감독 정보 찾기
const findDirector = (arr) => {
  const res = arr.find((crew) => crew.job === "Director");
  if(res) return res.name;
  else return "정보 없음"; 
}

// 상세 페이지 생성 함수
export const detailPage = (detail) => {
  const {id, release_date, runtime, status, tagline, title, video, genres, overview, credits, backdrop_path, poster_path} = detail;
  const backImage = backdrop_path ? backdrop_path : poster_path;
  
  let html;
  html = `
    <div class="detail-container">
      <div class="detail-back">
        <button type="button" class="btn btn-secondary">
          <a href="/">뒤로 가기</a>
        </button>
      </div>
      <div class="content">
        <div class="detail-backdrop">
          <img src="https://image.tmdb.org/t/p/original${backImage}" alt="포스터">
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
          <button id="clipBtn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalBox" data-id="${id}">미리 보기</button>
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
  `;
  
  // 메인 섹션 화면에 상세 페이지 삽입
  document.querySelector('.main-section').innerHTML = html;
}
