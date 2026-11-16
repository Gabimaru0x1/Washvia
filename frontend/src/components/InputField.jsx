// import ArrowRight from "./icons/ArrowRight";

const InputField = ({
  children,
  htmlFor,
  className = "",
  id,
  name,
  type,
  value,
  placeholder,
  onChange,
  ...inputProps
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{children}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`block rounded-full w-full bg-gray-100 px-5 py-3 text-black ${className}`}
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
};

export default InputField;
