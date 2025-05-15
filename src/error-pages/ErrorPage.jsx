import { Button, Navbar } from "flowbite-react";
import bgImage from "../assets/imgs/Background.svg";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex flex-col justify-between bg-Grey900"
    >
      <header>
        <Navbar fluid rounded className="bg-transparent text-white ">
          <svg
            className="ml-[120px]"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.25621 15.7628L26.7802 4.768C30.097 2.6872 34.4002 5.0796 34.4002 9.0052V30.9948C34.4002 34.92 30.097 37.3128 26.7802 35.232L9.25621 24.2372C6.1366 22.2796 6.1366 17.7204 9.25621 15.7628Z"
              fill="#4BB7FD"
            />
            <path
              d="M30.7441 15.7628L13.2201 4.768C9.9033 2.6872 5.6001 5.0796 5.6001 9.0052V30.9948C5.6001 34.92 9.9033 37.3128 13.2201 35.232L30.7441 24.2372C33.8637 22.2796 33.8637 17.7204 30.7441 15.7628Z"
              fill="#7B6EF6"
            />
          </svg>
        </Navbar>
      </header>

      <div className="w-1/2 text-center mx-auto">
        <div className="w-1/2 h-80 mt-10 flex justify-center items-center mx-auto">
          <img src="src/assets/imgs/Film rolls-rafiki.svg" />
        </div>
        <div className="mb-6 mt-10">
          <h2 className="mb-4 text-2xl font-semibold text-Grey50 font-Poppins">
            Lost your way?
          </h2>

          <p className="mb-3 text-Grey300 font-normal text-base font-Poppins">
            Oops! This is awkward. You are looking for something that doesn't
            actually exist.
          </p>
          <h2 className="mb-3 text-Grey300 text-base ">
            {" "}
            Error:{error.status}
          </h2>
        </div>
        <p className="mb-3 ">
          <Link to={`/`}>
            <Button className="py-4 px-8 bg-Primary400 rounded-xl font-normal text-base text-White100 mx-auto ">
              Go Home
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
