import { Flame } from "lucide-react";

const HeroSection = () => {
  return (
    <div className=" flex items-center flex-col gap-4 py-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 rounded-full bg-orange-500/10 border border-orange-500/30">
          <Flame className="text-orange-500" size={32} />
        </div>
        <h1 className="text-4xl md:text-7xl font-bold">Trending Now</h1>
      </div>
      <p className=" font-semibold text-xl text-base-content">Discover the hottest articles breaking through the community</p>
    </div>
  );
};

export default HeroSection;
