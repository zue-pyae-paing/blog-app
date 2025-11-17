import type React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={` ${className} p-4 md:px-8  mx-auto relative  `}>
      {children}
    </div>
  );
};

export default Container;
