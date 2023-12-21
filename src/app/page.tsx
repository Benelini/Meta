"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieData, setMovieData] = useState<Movie[]>([]);

  // Fetch movies from OMDb API
  const fetchMovies = async (searchValue: string) => {
    const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    const response = await fetch(
      `http://www.omdbapi.com/?s=${encodeURIComponent(
        searchValue
      )}&apikey=${apiKey}`
    );
    const data = await response.json();
    if (data.Search) {
      setMovieData(data.Search);
    } else {
      setMovieData([]);
    }
  };

  // Debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        fetchMovies(searchTerm);
        window.localStorage.setItem("lastSearchTerm", searchTerm);
      } else {
        setMovieData([]);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const lastSearchTerm = window.localStorage.getItem("lastSearchTerm");
    if (lastSearchTerm) {
      setSearchTerm(lastSearchTerm);
      fetchMovies(lastSearchTerm);
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
              ></Image>
              <div className="flex flex-col ">
                <Link href={`/movies/${movie.imdbID}`}>
                  <h2 className="text-2xl max-sm:text-lg">
                    {movie.Title} <span className="block">({movie.Year})</span>
                  </h2>
                  <h2></h2>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
