function FilmDetailCard({ movie }) {
  return (
    <section className="relative">
      <div className="mt-10 flex justify-center">
        <img
          src={movie.images}
          alt={movie.title}
          className="rounded-[40px] w-11/12 h-auto object-fill sm:h-[400px] md:h-[500px] lg:h-[600px]"
        />
      </div>
      <div className="backdrop-blur-xl bg-black/50 top-1/5 translate-y-[-50%] left-60 pl-10 py-10 rounded-3xl absolute md:min-w-[560px] box-border">
        <h2 className="font-Poppins font-normal text-xs text-Primary200">
          MaileHereko / {movie.type}
        </h2>
        <h3 className="font-Poppins font-semibold text-4xl text-Grey50 mt-2 mr-52">
          {movie.title}
        </h3>
      </div>
      <div className="flex w-11/12 justify-center mt-36">
        <div className="w-5/12 ml-60">
          <img src={movie.poster} alt={movie.title} className="rounded-3xl" />
        </div>

        <div className="w-5/12 bottom-80 h-[688px]">
          <h4 className="font-bold font-Poppins text-2xl text-Grey50 mb-6">
            {movie.title}
          </h4>
          <p className="font-normal font-Poppins text-Grey300 text-xl mb-6">
            {movie.plot}
          </p>
          <div className="inline-flex items-center text-Warning500 p-1 bg-Black65 rounded-lg mb-6">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7299 3.51001L15.4899 7.03001C15.7299 7.52002 16.3699 7.99001 16.9099 8.08001L20.0999 8.61001C22.1399 8.95001 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95001 3.89991 8.61001L7.08991 8.08001C7.61991 7.99001 8.25991 7.52002 8.49991 7.03001L10.2599 3.51001C11.2199 1.60001 12.7799 1.60001 13.7299 3.51001Z"
                stroke="#FFAD49"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="w-8 h-6 ml-1">{movie.imdb_rating}</span>
          </div>

          <div className="mb-6">
            <div className="font-Poppins text-base font-normal text-Grey400 mb-2">
              Type
            </div>
            <div className="font-Poppins font-normal text-Grey100 text-xl">
              {movie.type}
            </div>
          </div>

          <div className="mb-6">
            <div className="font-Poppins text-base font-normal text-Grey400 mb-2">
              Release Date
            </div>
            <div className="font-Poppins font-normal text-Grey100 text-xl">
              {movie.released}
            </div>
          </div>

          <div className="mb-6">
            <div className="font-Poppins text-base font-normal text-Grey400 mb-2">
              Run time
            </div>
            <div className="font-Poppins font-normal text-Grey100 text-xl">
              {movie.runtime}
            </div>
          </div>

          <div className="mb-6">
            <div className="font-Poppins text-base font-normal text-Grey400 mb-2">
              Genres
            </div>
            <div className="font-Poppins font-normal text-Grey100 text-xl">
              {movie.genres}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmDetailCard;
