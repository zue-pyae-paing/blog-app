

const ChartTooltipContent = ({ active, payload, label }: any) => {

  if (active && payload && payload.length) {
    return (
      <div className=" p-3 rounded-lg bg-primary-content">
        <p className="font-semibold text-primary">{label}</p>
        <p className="text-sm text-blue-600 capitalize">
          {payload[0].dataKey} <span className="font-bold ">{payload[0].value}</span>
        </p>
        <p className="text-sm text-purple-600 capitalize">
          {payload[1].dataKey} <span className="font-bold  ">{payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default ChartTooltipContent;
