import { FileX } from "lucide-react";

const EmptyTrendingBlogState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-20 h-20 flex items-center justify-center bg-orange-600/10 rounded-full">
        <FileX className="text-orange-500" size={40} />
      </div>

      <h2 className="text-2xl font-bold text-gray-200">No Blogs Available</h2>

      <p className="text-gray-400 max-w-sm">
        There are currently no blogs to display. Please try again later or
        refresh the page.
      </p>

      <button
        className="px-6 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 transition text-white font-medium"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
};

export default EmptyTrendingBlogState;
