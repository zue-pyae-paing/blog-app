const TrendingSkeleton = () => {
  return (
    <section className="space-y-3">
    
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
      
        <div className="md:col-span-2 col-span-1 md:h-96 h-46 rounded-lg overflow-hidden bg-gray-800 animate-pulse" />

       
        <div className="h-46 col-span-1 space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-lg bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      </div>

      
      <div className="grid md:grid-cols-3 items-center gap-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="h-48 rounded-lg bg-gray-800 animate-pulse"
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSkeleton;