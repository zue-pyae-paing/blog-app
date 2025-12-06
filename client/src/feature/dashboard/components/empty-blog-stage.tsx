
const EmptyStage = ({ message }: ({ message: string })) => {
  return <tr>
      <td colSpan={7}>
        <div className="flex flex-col items-center justify-center py-10 opacity-70">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
            alt="empty"
            className="w-20 mb-3 opacity-60"
          />
          <p className="text-lg font-medium">No {message} found</p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filters.
          </p>
        </div>
      </td>
    </tr>
};

export default EmptyStage
