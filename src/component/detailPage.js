

export const detailPage = () => {
  let hmtl;
  html = `
  <div class="container">
    <header>
      <h1>영화 제목</h1>
      <img src="poster.jpg" alt="포스터">
      <div class="info">
        <p>장르: 액션, 스릴러</p>
        <p>개봉 연도: 2023</p>
        <p>감독: 감독 이름</p>
        <p>출연 배우: 배우 1, 배우 2, 배우 3</p>
      </div>
    </header>
    <section class="synopsis">
      <h2>줄거리</h2>
      <p>영화 줄거리 내용...</p>
    </section>
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
}