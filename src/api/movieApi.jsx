import axios from 'axios';


export default async function movieApi(relativeUrl, params={}) {
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmQ0NDg3NGRkNzI0NWExZGE5YTY4NTU4Y2RmYjIxYiIsIm5iZiI6MTcyOTM2NjU5Ni43MTE3MzMsInN1YiI6IjY3MTNiYjdlNjUwMjQ4YjlkYjYyMTZjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RowMagaVt0ZsPzo3t0klErNp7Q8YAxF_JjrXWLQa9qY';

  const options = {
    method: 'GET',
    baseURL: 'https://api.themoviedb.org/3',
    url: relativeUrl,
    params: { language: 'en-US', ...params },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios(options);
  

  return data;
}
