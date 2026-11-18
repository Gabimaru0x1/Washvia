import { useId, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { signup } from "../services/authService";
import AuthFields from "../components/AuthFields";
import InputField from "../components/InputField";
import Button from "../components/Button";

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

  function togglePasswords() {
    setPasswordsVisible((visible) => !visible);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting || success) return;

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
    <section className="relative flex-center flex-col lg:w-lg md:w-md w-sm h-[70%] bg-white rounded-lg">
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

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
      </div>

      {success ? (
        <p role="status" className="text-center text-sm">
          {success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xs">
          <div className="mb-5 space-y-3">
            <AuthFields
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              passwordVisible={passwordsVisible}
              onTogglePassword={togglePasswords}
              isSignup
            />

            <InputField
              id={`${id}-phone`}
              htmlFor={`${id}-phone`}
              name="phone_number"
              type="tel"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Phone number"
              icon={FiPhone}
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

          {error && (
            <p role="alert" className="mt-3 text-sm">
              {error}
            </p>
          )}
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