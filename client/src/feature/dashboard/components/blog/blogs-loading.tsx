
import { useSearchParams } from "react-router";

const BlogsLoading = () => {
  const [searchParams] = useSearchParams();

  const limit = parseInt(searchParams.get("limit") || "6");

  return (
    <>
      {Array.from({ length: limit }).map((_, index) => (
        <tr className="animate-pulse" key={index}>
          <td>
            <div className="h-4 bg-base-300 rounded w-32"></div>
          </td>
          <td>
            <div className="h-4 bg-base-300 rounded w-20"></div>
          </td>
          <td>
            <div className="h-4 bg-base-300 rounded w-20"></div>
          </td>
          <td>
            <div className="h-4 bg-base-300 rounded w-16 mx-auto"></div>
          </td>
          <td>
            <div className="h-4 bg-base-300 rounded w-20"></div>
          </td>
          <td>
            <div className="h-4 bg-base-300 rounded w-10 ml-auto"></div>
          </td>
          <td>
            <div className="h-6 bg-base-300 rounded w-6 mx-auto"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default BlogsLoading;
