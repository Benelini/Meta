import Image from "next/image";
import Link from "next/link";

type TSimpleMovie = {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
  };
};

const MovieResult = ({ movie }: TSimpleMovie) => {
  return (
    <li className="flex flex-row mb-2 py-4 px-4">
      {movie.Poster !== "N/A" ? (
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={75}
          height={111}
          className="mr-4 rounded-md"
        />
      ) : (
        <div className="w-[75px] min-w-[75px] h-[111px] rounded-md mr-4  border-2 border-white text-center items-center flex flex-col justify-center">
          <p>No image</p>
        </div>
      )}
      <div className="flex flex-col">
        <Link
          className="text-2xl max-sm:text-lg hover:underline"
          href={`/movies/${movie.imdbID}`}
        >
          {movie.Title} <span className="block">({movie.Year})</span>
        </Link>
      </div>
    </li>
  );
};

export default MovieResult;
