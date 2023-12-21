"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import useDebounce from "./utils/use-debounce";
import { fetchMovies } from "./utils/fetch-movies";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY || "";

  const debouncedFetchMovies = async (term: string) => {
    const movies = await fetchMovies(term, apiKey);
    setMovieData(movies);
  };

  useDebounce(searchTerm, 500, debouncedFetchMovies);

  useEffect(() => {
    const lastSearchTerm = window.localStorage.getItem("lastSearchTerm");
    if (lastSearchTerm) {
      setSearchTerm(lastSearchTerm);
      debouncedFetchMovies(lastSearchTerm);
    }
  }, []);

  return (
    <main className="flex flex-col justify-start items-center p-4 bg-mainIndigo min-h-[100vh] h-fit">
      <input
        className="text-black rounded-md w-1/3 max-sm:w-full py-2 text-2xl mb-4 px-2"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies"
      />
      {movieData && movieData.length > 0 && (
        <ul className="bg-darkGreen rounded-2xl">
          {movieData.map((movie) => (
            <li className="flex flex-row mb-2 py-4 px-4" key={movie.imdbID}>
              <Image
                className="mr-4 rounded-md"
                src={movie.Poster}
                alt={movie.Title}
                width={75}
                height={111}
              />
              <div className="flex flex-col">
                <Link
                  className="text-2xl max-sm:text-lg hover:underline"
                  href={`/movies/${movie.imdbID}`}
                >
                  {movie.Title} <span className="block">({movie.Year})</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
