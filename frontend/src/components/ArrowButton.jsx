import ArrowRight from "./icons/ArrowRight";

const ArrowButton = ({ children, href, className = "", ...linkProps }) => {
  return (
    <a
      {...linkProps}
      href={href}
      className={`inline-flex cursor-pointer items-center gap-5 rounded-full bg-primary py-2 pl-5 pr-2 text-white ${className}`}
    >
      {children}
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-brand">
        <ArrowRight />
      </span>
    </a>
  );
};

export default ArrowButton;