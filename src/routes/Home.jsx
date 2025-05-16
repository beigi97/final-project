import { useState } from "react";
import { getFilms } from "../api/data";
import { useLoaderData } from "react-router-dom";
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

  return (
    <section>
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
