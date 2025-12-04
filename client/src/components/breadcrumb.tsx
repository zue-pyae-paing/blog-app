// Breadcrumb.tsx
import { Link, useLocation } from "react-router";
import React from "react";

interface BreadcrumbProps {
  separator?: React.ReactNode; 
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ separator = " / " }) => {
  const location = useLocation();



  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb">
      {pathnames.length === 0 ? (
        <span>Home</span>
      ) : (
        <>
          <Link to="/">Home</Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            
            const displayName = decodeURIComponent(value).replace(/-/g, " ");

            return isLast ? (
              <span key={to}>
                {separator}
                <span className=" capitalize">{displayName}</span>
              </span>
            ) : (
              <span key={to}>
                {separator}
                <Link to={to}>{displayName}</Link>
              </span>
            );
          })}
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
