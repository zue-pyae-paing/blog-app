import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "./theme-provider";

const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className=" flex gap-3">
      <button
        className="btn btn-primary  btn-sm btn-square"
        onClick={() => setTheme(theme === "light" ? "night" : "light")}
      >
        {theme === "light" ? <Sun /> : <MoonStar />}
      </button>
    </div>
  );
};

export default ThemeBtn;
