const Button = ({ children, className = "", type = "button", disabled, ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
