import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const InputField = ({
  children,
  htmlFor,
  className = "",
  id,
  type = "text",
  placeholder,
  icon,
  error,
  passwordVisible,
  onTogglePassword,
  showPasswordToggle = true,
  passwordToggleLabel = "password",
  ...inputProps
}) => {
  const [localPasswordVisible, setLocalPasswordVisible] = useState(false);

  const isPassword = type === "password";
  const isVisible = passwordVisible ?? localPasswordVisible;
  const hasPasswordToggle = isPassword && showPasswordToggle;
  const Icon = icon ?? (isPassword ? FiLock : null);

  const label = children ?? placeholder;
  const errorId = error && id ? `${id}-error` : undefined;
  const describedBy =
    [inputProps["aria-describedby"], errorId].filter(Boolean).join(" ") ||
    undefined;

  const leftPadding = Icon ? "pl-12" : "pl-5";
  const rightPadding = hasPasswordToggle ? "pr-12" : "pr-5";

  function handleTogglePassword() {
    if (onTogglePassword) {
      onTogglePassword();
    } else {
      setLocalPasswordVisible((visible) => !visible);
    }
  }

  return (
    <div>
      {label && (
        <label
          htmlFor={htmlFor ?? id}
          className={children == null ? "sr-only" : undefined}
        >
          {label}
        </label>
      )}

      {error && (
        <p
          id={errorId}
          className={`pl-5 mb-1 text-[12px] font-medium text-red-700`}
        >
          {error}
        </p>
      )}

      <div
        className={`relative rounded-full border-2 bg-gray-100 ${
          error ? "border-red-600" : "border-transparent focus-within:border-primary"
        }`}
      >
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500"
          />
        )}

        <input
          {...inputProps}
          id={id}
          type={isPassword && isVisible ? "text" : type}
          placeholder={placeholder}
          aria-invalid={error ? true : inputProps["aria-invalid"]}
          aria-describedby={describedBy}
          className={`block w-full rounded-full bg-transparent focus:outline-none py-3 text-black ${leftPadding} ${rightPadding} ${className}`}
        />

        {hasPasswordToggle && (
          <button
            type="button"
            aria-label={`${isVisible ? "Hide" : "Show"} ${passwordToggleLabel}`}
            disabled={inputProps.disabled}
            onClick={handleTogglePassword}
            className="absolute inset-y-0 right-1 grid w-10 place-items-center rounded-full text-gray-500 hover:text-gray-900"
          >
            {isVisible ? (
              <FiEyeOff aria-hidden="true" className="size-5" />
            ) : (
              <FiEye aria-hidden="true" className="size-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;