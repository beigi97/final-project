import { useTranslation } from "react-i18next";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilms, getGenreName, getGenresName } from "../api/data";
import HomeCard from "../components/HomeCard";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import { Spinner } from "flowbite-react";

export async function loader() {
  const response = await getFilms(1, 12);
  const movies = response.data;
  const metadata = response.metadata;

  const genres = await getGenresName();

  return { movies, metadata, genres };
}

export default function Home() {
  const { movies: initialMovies, metadata, genres } = useLoaderData();
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genreMovies, setGenreMovies] = useState([]);
  const [genrePage, setGenrePage] = useState(1);
  const [hasMoreGenre, setHasMoreGenre] = useState(true);
  const [totalMoviesCount, setTotalMoviesCount] = useState(
    metadata.total_count
  );
  const [genreTotalCount, setGenreTotalCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isGenreLoading, setIsGenreLoading] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (movies.length > 0) {
      setInitialLoading(false);
    }
  }, [movies]);

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

  const filterByGenre = async (genreName) => {
    setSelectedGenre(genreName);
    setSearchParams({});
    setGenrePage(1);
    setHasMoreGenre(true);
    setIsGenreLoading(true);

    if (genreName === "All") {
      setFilteredMovies([]);
      setTotalMoviesCount(metadata.total_count);
      setIsGenreLoading(false);
    } else {
      try {
        const response = await getGenreName(genreName, 1);
        setGenreMovies(response.data);
        setGenreTotalCount(response.metadata.total_count);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
        setGenreMovies([]);
        setHasMoreGenre(false);
        setGenreTotalCount(0);
      } finally {
        setIsGenreLoading(false);
      }
    }
  };

  const loadMoreGenreMovies = async () => {
    try {
      const nextPage = genrePage + 1;
      const response = await getGenreName(selectedGenre, nextPage);
      const moreMovies = response.data;

      setGenreMovies((prev) => [...prev, ...moreMovies]);
      setGenrePage(nextPage);

      if (moreMovies.length === 0) {
        setHasMoreGenre(false);
      }
    } catch (error) {
      console.error("Failed to load more genre movies:", error);
      setHasMoreGenre(false);
    }
  };

  const visibleGenres = genres.slice(0, 4);
  const hiddenGenres = genres.slice(4);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <section>
      <div className="w-5/12 mt-20 mb-6  ltr:ml-32 rtl:mr-32">
        <h1 className="font-semibold font-Poppins text-Grey50 text-custom-64 mb-4">
          {t("appTitle")}
        </h1>
        <p className="font-Poppins font-normal text-base text-Grey300 2xl:w-3/4">
          {t("appDescription_part1")}
          <span className="text-Primary400"> {t("appDescription_name")} </span>
          {t("appDescription_part2")}
        </p>
      </div>

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
            placeholder={t("search_placeholder")}
          />
        </div>
      </form>

      <div className="inline-flex ltr:ml-32 rtl:mr-32 mb-6 p-2 bg-Grey700 rounded-xl relative flex-wrap gap-2">
        <button
          onClick={() => filterByGenre("All")}
          className={`inline-flex items-center rounded-lg px-6 py-2 text-sm font-Poppins ${
            selectedGenre === "All"
              ? "bg-Primary400 text-white"
              : "bg-transparent text-Grey300 hover:bg-Grey800"
          }`}
        >
          {t("All")}
        </button>

        {visibleGenres.map((genre) => (
          <button
            key={genre.name}
            onClick={() => filterByGenre(genre.name)}
            className={`inline-flex items-center rounded-lg px-6 py-2 text-sm font-Poppins ${
              selectedGenre === genre.name
                ? "bg-Primary400 text-white"
                : "bg-transparent text-Grey300 hover:bg-Grey800"
            }`}
          >
            {genre.name}
          </button>
        ))}

        <button
          onClick={toggleDropdown}
          className="inline-flex items-center rounded-lg px-6 py-2 text-sm font-Poppins bg-transparent text-Grey300 hover:bg-Grey800"
        >
          {t("more")}
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 z-10 grid w-max grid-cols-2 bg-white rounded-lg shadow-md p-4 dark:bg-gray-700">
            {hiddenGenres.map((genre) => (
              <button
                key={genre.name}
                onClick={() => {
                  filterByGenre(genre.name);
                  setIsDropdownOpen(false);
                }}
                className="text-left text-sm text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 py-1 px-2"
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <h3 className="text-Grey400 text-3xl font-semibold ltr:ml-32 rtl:mr-32 mb-6 font-Poppins">
        {t("All")}
        <span className="text-Grey400 font-normal text-base">
          (
          {searchQuery
            ? filteredMovies.length
            : selectedGenre === "All"
            ? totalMoviesCount
            : genreTotalCount}
          )
        </span>
      </h3>

      {initialLoading ? (
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="w-1/3 md:w-1/4 lg:w-1/5 p-2 animate-pulse bg-Grey700 rounded-lg h-64"
            ></div>
          ))}
        </div>
      ) : isGenreLoading ? (
        <div className="flex justify-center py-10">
          <Spinner color="purple" size="lg" />
        </div>
      ) : searchQuery ? (
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
              {t("no_results")}
            </p>
          )}
        </div>
      ) : selectedGenre !== "All" ? (
        <InfiniteScroll
          dataLength={genreMovies.length}
          next={loadMoreGenreMovies}
          hasMore={hasMoreGenre}
          loader={
            <div className="flex justify-center items-center gap-2 py-4">
              <span className="text-Grey300">{t("loading")}</span>
              <Spinner color="purple" size="lg" />
            </div>
          }
          endMessage={
            <div className="flex justify-center py-4">
              {t("no_more_movies_genre")}
            </div>
          }
          scrollThreshold={0.9}
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 w-full">
            {genreMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex-none w-1/3 md:w-1/4 lg:w-1/5 p-2"
              >
                <HomeCard movie={movie} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
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
              {t("no_more_movies")}
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
      )}
    </section>
  );
}
