import { useLoaderData } from "react-router-dom";
import { getFilmDetails } from "../api/data";
import FilmDetailCard from "../components/FilmDetailCard";

export async function loader({ params }) {
  const movie = await getFilmDetails(params.id);
  return { movie };
}

export default function FilmDetailPage() {
  const { movie } = useLoaderData();

  return (
    <div>
      <FilmDetailCard movie={movie} />
    </div>
  );
}
