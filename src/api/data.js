import axios from "axios";

export const getFilms = async (page = 1) => {
  const { data } = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}`
  );
  return data;
};
