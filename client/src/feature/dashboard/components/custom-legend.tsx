const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-4 p-3 bg-base-200 rounded-lg shadow max-w-fit ">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />

          <span className="text-sm font-medium capitalize">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
