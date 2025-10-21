import type React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={` ${className} px-4 md:px-8`}>{children}</div>;
};

export default Container;
