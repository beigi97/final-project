import { useEffect, useState } from "react";
import { getFilms } from "../api/data";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";
import HomeCard from "../components/HomeCard";

export async function loader() {
  const response = await getFilms(1, 12);
  const movies = response.data;
  const metadata = response.metadata;

  return { movies, metadata };
}

export default function Home() {
  const { movies: initialMovies, metadata } = useLoaderData();
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [filteredMovies, setFilteredMovies] = useState([]);

  const loadMoreMovies = async () => {
    setLoading(true);
    const response = await getFilms(page, 12);
    const newMovies = response.data;

    setMovies((prevMovies) => [...prevMovies, ...newMovies]);

    if (newMovies.length < 12 || page >= metadata.page_count) {
      setHasMore(false);
    } else {
      setPage((prevPage) => prevPage + 1);
    }

    setLoading(false);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    if (value.trim() === "") {
      setSearchParams({});
    } else {
      setSearchParams({ q: value });
    }
  };

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      if (searchQuery.trim() === "") {
        setFilteredMovies([]);
        return;
      }

      try {
        const response = await getFilms(1, 12, searchQuery);
        setFilteredMovies(response.data);
      } catch (error) {
        console.error("Search error:", error);
        setFilteredMovies([]);
      }
    };

    fetchSearchedMovies();
  }, [searchQuery]);

  return (
    <section>
      <form className="max-w-md mb-20 ltr:ml-32 rtl:mr-32 border-gray-500">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={handleNameChange}
            className="block w-80 p-4 ps-10 text-sm text-Grey50 border border-Black10 rounded-lg bg-Grey700"
            placeholder="Search Movies or TV Shows"
          />
        </div>
      </form>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 w-full">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-1/3 md:w-1/4 lg:w-1/5 p-2"
            >
              <HomeCard movie={movie} />
            </div>
          ))
        ) : (
          <p className="text-Grey300 text-center w-full mt-4">
            "No results found."
          </p>
        )}
      </div>{" "}
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMoreMovies}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-4">
            <Spinner color="purple" size="lg" />
          </div>
        }
        endMessage={
          <div className="flex justify-center py-4">
            No more movies available.
          </div>
        }
        scrollThreshold={0.9}
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 w-full">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-1/3 md:w-1/4 lg:w-1/5 p-2"
            >
              <HomeCard movie={movie} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}
