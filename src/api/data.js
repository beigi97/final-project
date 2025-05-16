import axios from "axios";

export const getFilms = async (page = 1, perPage = 12, query = "") => {
  const queryParam = query ? `&q=${query}` : "";
  const { data } = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}&per_page=${perPage}${queryParam}`
  );
  return data;
};

export const getGenresName = async () => {
  const { data } = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/genres`
  );
  return data;
};

export const getGenreName = async (genre, page = 1) => {
  const { data } = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/genres/${genre}/movies?page=${page}`
  );
  return data;
};
