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

      <div className="relative">
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
          className={`block w-full rounded-full bg-gray-100 py-3 text-black ${
            Icon ? "pl-12" : "pl-5"
          } ${hasPasswordToggle ? "pr-12" : "pr-5"} ${className}`}
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