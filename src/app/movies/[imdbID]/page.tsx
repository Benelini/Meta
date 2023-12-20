type TMovieDetail = {
  params: {
    imdbID: string;
  };
};

const MovieDetail = ({ params }: TMovieDetail) => {
  const { imdbID } = params;

  return (
    <div className="flex flex-col bg-mainIndigo justify-center items-center w-screen text-center h-[100vh]">
      <h1 className="text-2xl text-center">{imdbID}</h1>
    </div>
  );
};

export default MovieDetail;
