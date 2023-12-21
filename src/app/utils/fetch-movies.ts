"use server"
export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export const fetchMovies = async (searchValue: string, apiKey: string) => {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${encodeURIComponent(searchValue)}&apikey=${apiKey}`
  );
  const data = await response.json();
  return data.Search ? data.Search : [];
};
