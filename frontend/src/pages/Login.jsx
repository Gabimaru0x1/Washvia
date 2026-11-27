import { useState } from "react";
import { login } from "../services/auth";
import AuthFields from "../components/AuthFields";
import Button from "../components/Button";
import { validateForm } from "../utils/validateForm";

export default function Login({ onClose, onSwitchMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const passwordError =
    password.length > 0 && password.length < 6
      ? "Password must be at least 6 characters."
      : "";

  function handleFormChange(event) {
    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors(validateForm(event.currentTarget));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    const nextFieldErrors = validateForm(event.currentTarget);
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0 || passwordError) return;

    setIsSubmitting(true);

    try {
      await login({ email, password });
      window.location.assign("/dashboard");
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

      <div className="relative w-full mb-6 text-center">
        <h1 className="text-2xl font-bold">Log In</h1>

        {error && (
          <p
            role="alert"
            className="absolute top-8 left-25 mb-3 text-red-500 text-[13px]"
          >
            {error}
          </p>
        )}
      </div>

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
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary px-4 py-3 text-white"
        >
          {isSubmitting ? "Logging in…" : "Log in"}
        </Button>

        <div className="flex-center gap-1">
          <p className="text-sm mt-5 text-gray-500">Don't have an account?</p>
          <Button
            type="button"
            onClick={onSwitchMode}
            disabled={isSubmitting}
            className="text-sm mt-5 text-gray-500 underline"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </section>
  );
}