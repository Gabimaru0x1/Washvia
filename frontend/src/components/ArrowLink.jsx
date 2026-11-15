import { Link } from "react-router-dom";
import ArrowRight from "./icons/ArrowRight";

const ArrowButton = ({ children, href, className = "", ...linkProps }) => {
  return (
    <Link
      {...linkProps}
      to={href}
      className={`arrow-btn ${className}`}
    >
      {children}
      <span className="arrow-bg">
        <ArrowRight />
      </span>
    </Link>
  );
};

export default ArrowButton;