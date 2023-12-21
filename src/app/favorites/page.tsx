"use client";
import { useEffect, useState } from "react";
import MovieResult from "../components/movie-result";

type TMovieSimple = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<TMovieSimple[]>([]);

  useEffect(() => {
    const storedFavoritesString =
      window.localStorage.getItem("favorites") || "[]";
    const storedFavorites: TMovieSimple[] = JSON.parse(storedFavoritesString);
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center p-4 bg-mainIndigo min-h-[100vh] h-fit">
      {favorites.length > 0 ? (
        <ul className="bg-darkGreen rounded-2xl md:w-1/3">
          {favorites.map((movie) => (
            <MovieResult key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      ) : (
        <p>No favorite movies added yet.</p>
      )}
    </div>
  );
}
