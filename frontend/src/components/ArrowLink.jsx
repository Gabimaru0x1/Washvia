// import { Link } from "react-router-dom";
import ArrowRight from "./icons/ArrowRight";

const ArrowButton = ({ children, className = "", onClick, ...linkProps }) => {
  return (
    <a
      {...linkProps}
      className={`arrow-btn ${className}`}
      onClick={onClick}
    >
      {children}
      <span className="arrow-bg">
        <ArrowRight />
      </span>
    </a>
  );
};

export default ArrowButton;