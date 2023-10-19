// 영화 모듈에서 필요한 함수를 가져옵니다.
import { movieSearch, movieVideo } from "./movie.js";

// API fetch 객체 정의
export const apiFetch = {
  // 지정된 URL에서 데이터를 가져오는 GET 메서드입니다.
  get: async (url) => {
    try {
      const result = await fetch(url, {
        mode: 'cors',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDMzYWIzYTZmYzFmM2E4ZjQzZjI0YWVhNWFhYjQwMiIsInN1YiI6IjYyMjA5YjhlNmY0M2VjMDA0NDZlYmFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkzGyaxEpNJNdUI-jaBEbeZDu9YbnuInBn1hhVFEU70',
        },
      });

      if (!result.ok) throw result;

      return await result.json();
    } catch (err) {
      return err;
    }
  },

  // 지정된 URL에 데이터를 전송하는 POST 메서드입니다.
  post: async (url, data) => {
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDMzYWIzYTZmYzFmM2E4ZjQzZjI0YWVhNWFhYjQwMiIsInN1YiI6IjYyMjA5YjhlNmY0M2VjMDA0NDZlYmFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkzGyaxEpNJNdUI-jaBEbeZDu9YbnuInBn1hhVFEU70',
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) throw result;

      return result.json();
    } catch (err) {
      return err;
    }
  },
};

// 검색 입력 필드에 포커스를 맞춥니다.
const input = document.querySelector('.search-input');
input.focus();

// 검색 입력 필드에서 엔터 키가 눌리면 영화 검색 함수를 호출하고 입력값을 초기화합니다.
input.addEventListener("keyup", async (e) => {
  if (e.key === 'Enter') {
    await movieSearch(e.currentTarget.value);
    input.value = null;
  }
});

// 스크롤 이벤트를 추가하여 헤더의 활성 여부를 조정합니다.
window.addEventListener('scroll', () => {
  const scrollTop = document.scrollingElement.scrollTop;
  const headerDom = document.querySelector('header');
  if (scrollTop === 0) {
    headerDom.classList.remove('active');
  } else {
    headerDom.classList.add('active');
  }
});

// 모달 박스를 변수로 지정합니다.
var modalBox = document.querySelector('#modalBox');

// 모달이 활성화되면 유튜브 비디오를 로드합니다.
if (modalBox) {
  modalBox.addEventListener('show.bs.modal', async function () {
    const modalBtn = document.querySelector('#clipBtn');
    const movieId = modalBtn.getAttribute('data-id');
    const response = await movieVideo(movieId);
    const fi = response.results.find((da) => da.site === 'YouTube');
    const iframe = document.querySelector('#youtubeFrame');
    iframe.src = `https://www.youtube.com/embed/${fi.key}`;
  });

  // 모달이 닫히면 유튜브 비디오를 초기화합니다.
  modalBox.addEventListener('hide.bs.modal', async function () {
    const iframe = document.querySelector('#youtubeFrame');
    iframe.src = "";
  });
}
