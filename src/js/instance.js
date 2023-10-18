
export const apiFetch = {
  get:async (url) => {
    console.log('에이피아이 패치')
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