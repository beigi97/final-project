import axios from "axios";

export const getFilms = async (page = 1, perPage = 12, query = "") => {
  const queryParam = query ? `&q=${query}` : "";
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/movies?page=${page}&per_page=${perPage}${queryParam}`
  );
  return data;
};

export const getGenresName = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/genres`);
  return data;
};

export const getGenreName = async (genre, page = 1) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/genres/${genre}/movies?page=${page}`
  );
  return data;
};
export const getFilmDetails = async (id) => {
  if (!id) {
    return;
  }
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/movies/${id}`
  );
  return data;
};
