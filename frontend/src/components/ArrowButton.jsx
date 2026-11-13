import ArrowRight from "./icons/ArrowRight";

const ArrowButton = ({
  children,
  type = "button",
  className = "",
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      type={type}
      className={`inline-flex cursor-pointer items-center gap-5 bg-primary pl-5 pr-2 py-2 text-white rounded-full ${className}`}
    >
      {children}
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-brand">
        <ArrowRight />
      </span>
    </button>
  );
};

export default ArrowButton;
