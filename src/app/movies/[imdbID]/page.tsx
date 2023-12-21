"use client";
import BackButton from "@/app/components/svgs/back-button";
import RatingStar from "@/app/components/svgs/rating-star";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type TMovieDetail = {
  params: {
    imdbID: string;
  };
};

type TMovieLong = {
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
  const [movie, setMovie] = useState<TMovieLong | null>(null); // Use the Movie type for state
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
        const data: TMovieLong = await response.json(); // Cast the response to Movie type
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
    return (
      <div className="self-center h-screen bg-mainIndigo w-full justify-center items-center flex flex-col">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="self-center h-screen bg-mainIndigo w-full justify-center items-center flex flex-col">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-row bg-mainIndigo justify-center items-start w-screen text-center h-fit px-4 pb-4 min-h-screen">
      {movie && (
        <div className="flex flex-col justify-start items-center bg-darkGreen rounded-md px-4 py-4 max-w-2xl mt-10 pb-12">
          <div className="flex flex-row justify-between items-center text-center w-full pb-2">
            <Link className="py-2 text-4xl font-bold" href="/">
              <BackButton className="fill-white" />
            </Link>
            <h1 className="text-4xl max-sm:text-2xl font-bold text-center w-full">
              {movie.Title}
            </h1>
            <div className="w-6"></div>
          </div>

          <div className="flex flex-row items-start max-sm:flex-col max-sm:justify-center max-sm:items-center justify-start">
            {movie.Poster !== "N/A" ? (
              <Image
                className="mr-4 rounded-md max-sm:mr-0 max-sm:mb-4"
                src={movie.Poster}
                alt={movie.Title}
                width={260}
                height={400}
              ></Image>
            ) : (
              <div className="w-full min-w-[250px] h-[400px] rounded-md mr-4 max-sm:mr-0 border-2 border-white text-center items-center flex flex-col justify-center">
                <p>No image</p>
              </div>
            )}

            <div className="flex flex-col font-bold text-left gap-1 max-sm:px-10">
              <p>{movie.Genre}</p>
              <p className="flex flex-row place-items-center gap-1">
                {movie.Country},{movie.Year}
              </p>

              <p>
                Director: <span className="font-normal">{movie.Director}</span>{" "}
              </p>

              <p className="flex flex-row place-items-center">
                Rating:
                <span className="font-normal ml-1">
                  {" "}
                  {movie.imdbRating} / 10{" "}
                </span>
                <RatingStar />
              </p>
              <p className="text-sm font-normal">{movie.Plot}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
