import { Link } from "react-router-dom";

export default function HomeCard({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden relative">
        <div className="absolute top-6 left-6 text-Warning500 ">
          <span className="bg-Black65 rounded-lg  flex p-2 items-center ">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M9.15327 2.33999L10.3266 4.68666C10.4866 5.01333 10.9133 5.32666 11.2733 5.38666L13.3999 5.73999C14.7599 5.96666 15.0799 6.95333 14.0999 7.92666L12.4466 9.57999C12.1666 9.85999 12.0133 10.4 12.0999 10.7867L12.5733 12.8333C12.9466 14.4533 12.0866 15.08 10.6533 14.2333L8.65994 13.0533C8.29994 12.84 7.70661 12.84 7.33994 13.0533L5.34661 14.2333C3.91994 15.08 3.05327 14.4467 3.42661 12.8333L3.89994 10.7867C3.98661 10.4 3.83327 9.85999 3.55327 9.57999L1.89994 7.92666C0.926606 6.95333 1.23994 5.96666 2.59994 5.73999L4.72661 5.38666C5.07994 5.32666 5.50661 5.01333 5.66661 4.68666L6.83994 2.33999C7.47994 1.06666 8.51994 1.06666 9.15327 2.33999Z"
                stroke="#FFAD49"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {movie.imdb_rating}
          </span>
        </div>

        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-96 object-fill p-2 bg-Block80 "
        />

        <div className="p-4 overflow-hidden bg-Block80 ">
          <h5 className=" text-base font-semibold tracking-tight text-Grey50  truncate mb-4 ">
            {movie.title}
          </h5>
        </div>
      </div>
    </Link>
  );
}
