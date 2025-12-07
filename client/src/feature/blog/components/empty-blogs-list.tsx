import { FileX } from "lucide-react";

const EmptyBlogList = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 gap-6 text-center">
      <div className="w-24 h-24 flex items-center justify-center bg-orange-600/10 rounded-full">
        <FileX size={48} className="text-orange-500" />
      </div>

      <h2 className="text-2xl font-bold text-gray-200">No Blogs Found</h2>

      <p className="text-gray-400 max-w-md">
        There are currently no blogs available.  
        Try adjusting your filters or come back later.
      </p>

      <button
        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 transition text-white rounded-lg font-medium"
        onClick={() => window.location.reload()}
      >
        Refresh Page
      </button>
    </div>
  );
};

export default EmptyBlogList;
