export default function SkeletonCard() {
  return (
    <div
      role="status"
      className="max-w-sm p-4 border-8 border-Grey900 rounded-xl shadow-sm animate-pulse md:p-6 dark:border-Grey800"
    >
      <div className="flex items-center justify-center h-96 mb-4 bg-Grey800 rounded-sm dark:bg-Grey900 relative  ">
        <div className="absolute top-6 left-6 ">
          <span className="bg-Grey900 rounded-lg  flex p-2 items-center w-14 h-8"></span>
        </div>
      </div>
      <div>
        <div className="h-2.5 bg-Grey800 rounded-full dark:bg-Grey900 w-32 mb-2"></div>
        <div className="w-48 h-2 bg-Grey800 rounded-full dark:bg-Grey900"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
