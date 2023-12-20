"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

type TMovieDetail = {
  params: {
    imdbID: string;
  };
};

type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

const MovieDetail = ({ params }: TMovieDetail) => {
  const { imdbID } = params;
  const [movie, setMovie] = useState<Movie | null>(null); // Use the Movie type for state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
        const response = await fetch(
          `http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Movie = await response.json(); // Cast the response to Movie type
        setMovie(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [imdbID]);

  if (loading) {
    return <div className="self-center">Loading...</div>;
  }

  if (error) {
    return <div className="self-center">Error: {error}</div>;
  }

  return (
    <div className="flex flex-row bg-mainIndigo justify-center items-start w-screen text-center h-[100vh]">
      {movie && (
        <div className="flex flex-row justify-start items-center bg-darkGreen rounded-md px-4 py-4 max-w-2xl mt-10">
          <Image
            className="mr-4 rounded-md"
            src={movie.Poster}
            alt={movie.Title}
            width={260}
            height={400}
          ></Image>
          <div className="flex flex-col font-bold text-left gap-1">
            <h1 className="text-4xl font-bold text-left">{movie.Title}</h1>
            <p>{movie.Genre}</p>
            <div className="flex flex-row place-items-center gap-1">
              <p>{movie.Country}, </p>
              <p>{movie.Year}</p>
            </div>

            <p>
              Director: <span className="font-normal">{movie.Director}</span>{" "}
            </p>

            <p className="flex flex-row place-items-center">
              Rating:
              <span className="font-normal ml-1">
                {" "}
                {movie.imdbRating} / 10{" "}
              </span>
              <svg
                className="ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  fill="yellow"
                  d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                />
              </svg>
            </p>
            <p className="text-sm font-normal">{movie.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
