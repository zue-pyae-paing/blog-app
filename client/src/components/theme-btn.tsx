import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "./theme-provider";

const ThemeBtn = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className=" flex gap-3">
      <button
        className="btn btn-primary btn-outline btn-sm"
        onClick={() => setTheme(theme === "light" ? "forest" : "light")}
      >
        {theme === "light" ? <Sun /> : <MoonStar />}
        {theme === "light" ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default ThemeBtn;
