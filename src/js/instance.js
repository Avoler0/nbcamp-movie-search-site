import { movieSearch, movieVideo } from "./movie.js";

export const apiFetch = {
  get:async (url) => {
    try{
      const result = await fetch(url,{
        mode: 'cors',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDMzYWIzYTZmYzFmM2E4ZjQzZjI0YWVhNWFhYjQwMiIsInN1YiI6IjYyMjA5YjhlNmY0M2VjMDA0NDZlYmFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkzGyaxEpNJNdUI-jaBEbeZDu9YbnuInBn1hhVFEU70',
        },
      })

      if(!result.ok) throw result;

      return await result.json();
    }catch(err){
      return err;
    }
  },
  post:async (url,data) => {
    try{
      const result = await fetch(url,{
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDMzYWIzYTZmYzFmM2E4ZjQzZjI0YWVhNWFhYjQwMiIsInN1YiI6IjYyMjA5YjhlNmY0M2VjMDA0NDZlYmFmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkzGyaxEpNJNdUI-jaBEbeZDu9YbnuInBn1hhVFEU70',
        },
        body: JSON.stringify(data)
      });

      if(!result.ok) throw result;

      return result.json();
    }catch(err){
      return err;
    }
  },
}
const input = document.querySelector('.search-input')
input.focus();
input.addEventListener("keyup", async (e) => {
  if(e.key === 'Enter'){
    await movieSearch(e.currentTarget.value)
    input.value = null
  }
})

window.addEventListener('scroll', () => {
  const scrollTop = document.scrollingElement.scrollTop;
  const headerDom = document.querySelector('header');
  if (scrollTop === 0) {
    headerDom.classList.remove('active')
  } else {
    headerDom.classList.add('active')
  }
})

var modalBox = document.querySelector('#modalBox')

console.log('모달',modalBox)
if(modalBox){
  

  modalBox.addEventListener('show.bs.modal', async function () {
    const modalBtn = document.querySelector('#clipBtn')
    const movieId = modalBtn.getAttribute('data-id');
    const response = await movieVideo(movieId)
    const fi = response.results.find((da)=> da.site === 'YouTube');
    const iframe = document.querySelector('#yotubueFrame');
    iframe.src = `https://www.youtube.com/embed/${fi.key}`
  })

  modalBox.addEventListener('hide.bs.modal', async function () {
    const iframe = document.querySelector('#yotubueFrame');
    iframe.src = ""
  })
}
