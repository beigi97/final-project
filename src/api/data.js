import axios from "axios";

export const getFilms = async (page = 1, perPage = 12, query = "") => {
  const queryParam = query ? `&q=${query}` : "";
  const { data } = await axios.get(
    `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}&per_page=${perPage}${queryParam}`
  );
  return data;
};
