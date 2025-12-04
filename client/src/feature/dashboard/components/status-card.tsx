import { type ReactElement } from "react";
import CountUp from "react-countup";

const StatusCard = ({
  title,
  value,
  icon,
  valueColor,
  iconBg,
}: {
  title: string;
  value: number;
  valueColor: string;
  icon: ReactElement;
  iconBg: string;
}) => {
  const formatFn = (num: number) => 
    num > 1000 ? `${(num / 1000).toFixed(1)}k` : num;

  return (
    <div className="card bg-base-300 flex items-center justify-between p-4 flex-row shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-start justify-between w-full">
        <div>
          <h4 className="text-sm font-medium text-slate-600 ">{title}</h4>

          <CountUp
            end={value}
            duration={1.5}
           
            separator=","
            className={`text-2xl font-bold ${valueColor}`}
          />
        </div>

        <div className={`p-3 rounded-xl ${iconBg}`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatusCard;
