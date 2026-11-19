import { useId, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { signup } from "../services/authService";
import AuthFields from "../components/AuthFields";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { validateForm } from "../utils/validateForm";

const MIN_PASSWORD_LENGTH = 6;
const PHONE_PATTERN = /^[0-9]{11}$/;

export default function Signup({ onClose, onSwitchMode }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsVisible, setPasswordsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const isPhoneValid = PHONE_PATTERN.test(phoneNumber);
  const isPasswordTooShort = password.length < MIN_PASSWORD_LENGTH;
  const passwordsMatch = password === confirmPassword;

  const phoneError =
    phoneNumber.length > 0 && !isPhoneValid
      ? "Phone number must be exactly 11 digits."
      : "";

  const passwordError =
    password.length > 0 && isPasswordTooShort
      ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
      : "";

  const confirmPasswordError =
    confirmPassword.length > 0 && !passwordsMatch
      ? "Passwords do not match."
      : "";

  function togglePasswords() {
    setPasswordsVisible((visible) => !visible);
  }

  function handleFormChange(event) {
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors(validateForm(event.currentTarget));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || success) return;

    setError("");

    const nextFieldErrors = validateForm(event.currentTarget);
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) return;
    if (!isPhoneValid || isPasswordTooShort || !passwordsMatch) return;

    setIsSubmitting(true);

    try {
      await signup({
        email,
        phone_number: phoneNumber,
        password,
      });

      setPassword("");
      setConfirmPassword("");
      setSuccess("Account created. You can now log in.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative flex-center flex-col lg:w-lg md:w-md w-sm h-[80%] bg-white rounded-lg">
      <Button
        type="button"
        onClick={onClose}
        className="absolute right-9 top-5 gap-1"
      >
        <span className="text-2xl" aria-hidden="true">
          ×
        </span>
        <span>Close</span>
      </Button>

      <div className="relative w-full mb-6 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        {error && (
          <p
            role="alert"
            className="absolute top-8 left-25 mb-3 text-red-500 text-[13px]"
          >
            {error}
          </p>
        )}
      </div>

      {success ? (
        <p role="status" className="mb-3 text-green-500 text-[13px]">
          {success}
        </p>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          onChange={handleFormChange}
          className="mx-auto w-full max-w-xs"
        >
          <div className="mb-5 space-y-3">
            <AuthFields
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              emailError={fieldErrors.email}
              passwordError={fieldErrors.password || passwordError}
              passwordVisible={passwordsVisible}
              onTogglePassword={togglePasswords}
              isSignup
            />

            <InputField
              id={`${id}-phone`}
              htmlFor={`${id}-phone`}
              name="phone_number"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Phone number"
              icon={FiPhone}
              error={fieldErrors.phone_number || phoneError}
              required
            />

            <InputField
              id={`${id}-confirm-password`}
              htmlFor={`${id}-confirm-password`}
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              error={fieldErrors.confirmPassword || confirmPasswordError}
              passwordVisible={passwordsVisible}
              showPasswordToggle={false}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary px-4 py-3 text-white"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>
      )}

      <div className="mt-5 flex-center gap-1">
        <p className="text-sm text-gray-500">Already have an account?</p>
        <Button
          type="button"
          onClick={onSwitchMode}
          disabled={isSubmitting}
          className="text-sm text-gray-500 underline"
        >
          Log In
        </Button>
      </div>
    </section>
  );
}
