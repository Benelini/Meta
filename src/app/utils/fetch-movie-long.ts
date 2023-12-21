"use server";
export type TMovieLong = {
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
  
export const fetchMovieLong = async (imdbID: string, apiKey: string): Promise<TMovieLong | null> => {
try {
    const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${apiKey}`);
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
} catch (error) {
    console.error("Fetching movie details failed:", error);
    return null;
}
};