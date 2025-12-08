import { Eye, MessageCircle } from "lucide-react";
import useTrending from "../hooks/useTrending";
import { useNavigate } from "react-router";
import TrendingSkeleton from "./trending-skeleton";
import EmptyTrendingBlogState from "./empty-trending-blog-state";

const TrendingSection = () => {
  const { loading, trendingBlogs } = useTrending();
  const navigator = useNavigate();
  if (loading) return <TrendingSkeleton />;
  if (!trendingBlogs.length) return <EmptyTrendingBlogState />;
  return (
    <section className=" w-full space-y-3 relative h-full">
      <div className=" grid md:grid-cols-3 grid-cols-1 gap-3">
        <div
          className="md:col-span-2 col-span-1 md:h-96 h-46 rounded-lg overflow-hidden group cursor-pointer relative"
          onClick={() => navigator(`/blog/${trendingBlogs[0]?._id}`)}
        >
          <div className="relative h-full overflow-hidden">
            <img
              src={trendingBlogs[0]?.image}
              alt={trendingBlogs[0]?.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute  flex flex-col justify-end p-6 gap-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center md:w-12 md:h-12  w-8 h-8 rounded-full bg-orange-600 font-bold text-white text-md md:text-lg">
                #1
              </div>
              <span className="px-3 py-1 bg-orange-600/20 border border-orange-500/50 rounded-full text-xs font-semibold text-orange-300">
                {trendingBlogs[0]?.categoryId?.name}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-orange-500">
              {trendingBlogs[0]?.title}
            </h3>
            <div className=" flex w-full items-center justify-between">
              <h4 className=" capitalize  text-white text-sm">
                By {trendingBlogs[0]?.author?.username}
              </h4>
              <div className=" flex items-center gap-x-3">
                <div className=" flex items-center gap-x-2 text-white">
                  <Eye size={16} />
                  <span className=" text-xs">
                    {trendingBlogs[0]?.views > 1000
                      ? `${(trendingBlogs[0]?.views / 1000).toFixed(2)}k`
                      : trendingBlogs[0]?.views}
                  </span>
                </div>
                <div className=" flex items-center gap-x-2 text-white">
                  <MessageCircle size={16} />
                  <span className=" text-xs">
                    {trendingBlogs[0]?.comments.length > 1000
                      ? `${(trendingBlogs[0]?.comments.length / 1000).toFixed(
                          2
                        )}k`
                      : trendingBlogs[0]?.comments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-46 col-span-1 space-y-3">
          {trendingBlogs?.slice(1, 3).map((blog, index) => (
            <div
              className=" h-full w-full relative overflow-hidden group rounded-lg "
              key={blog._id}
              onClick={() => navigator(`/blog/${blog?._id}`)}
            >
              <img
                src={blog?.image}
                alt={blog?.title}
                className="  group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
              />
              <div className=" p-4 absolute inset-0  justify-end flex flex-col   ">
                <div className=" flex flex-col gap-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center   w-8 h-8 rounded-full bg-orange-600 font-bold text-white text-md">
                      #{index + 2}
                    </div>
                    <span className="px-3 py-1 bg-orange-600/20 border border-orange-500/50 rounded-full text-xs font-semibold text-orange-300">
                      {blog?.categoryId?.name}
                    </span>
                  </div>
                  <h3 className=" text-xl font-bold capitalize text-white group-hover:text-orange-500">
                    {blog?.title}
                  </h3>
                  <div className=" flex w-full items-center justify-between">
                    <h4 className=" capitalize  text-white text-sm">
                      By {blog?.author?.username}
                    </h4>
                    <div className=" flex items-center gap-x-3 ">
                      <div className=" flex items-center gap-x-2 text-white">
                        <Eye size={16} />
                        <span className=" text-xs">
                          {" "}
                          {blog?.views > 1000
                            ? `${(blog?.views / 1000).toFixed(2)}k`
                            : blog?.views}
                        </span>
                      </div>
                      <div className=" flex items-center gap-x-2 text-white">
                        <MessageCircle size={16} />
                        <span className=" text-xs">
                          {" "}
                          {blog?.comments.length > 1000
                            ? `${(blog?.comments.length / 1000).toFixed(2)}k`
                            : blog?.comments.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-3 items-center gap-3">
        {trendingBlogs?.slice(3, 12).map((blog, index) => (
          <div
            className=" h-full w-full relative overflow-hidden group rounded-lg "
            key={blog._id}
            onClick={() => navigator(`/blog/${blog?._id}`)}
          >
            <img
              src={blog?.image}
              alt={blog?.title}
              className="  group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
            />
            <div className=" p-4 absolute inset-0 justify-end flex flex-col   ">
              <div>
                <div className="flex items-center justify-center   w-8 h-8 rounded-full bg-orange-600 font-bold text-white text-md">
                  #{index + 4}
                </div>
                <h3 className=" text-2xl font-bold text-white group-hover:text-orange-500">
                  {blog?.title}
                </h3>
                <div className=" flex w-full items-center justify-between">
                  <h4 className=" capitalize  text-white text-sm">
                    By {blog?.author?.username}
                  </h4>
                  <div className=" flex items-center gap-x-3 ">
                    <div className=" flex items-center gap-x-2 text-white">
                      <Eye size={16} />
                      <span className=" text-xs">
                        {blog?.views > 1000
                          ? `${(blog?.views / 1000).toFixed(2)}k`
                          : blog?.views}
                      </span>
                    </div>
                    <div className=" flex items-center gap-x-2 text-white">
                      <MessageCircle size={16} />
                      <span className=" text-xs">
                        {blog?.comments.length > 1000
                          ? `${(blog?.comments.length / 1000).toFixed(2)}k`
                          : blog?.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
