import { useState } from "react";
import { login } from "../services/authService";
import AuthFields from "../components/AuthFields";
import Button from "../components/Button";

export default function Login({ onClose, onSwitchMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
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

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Log In</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xs">
        <div className="mb-5 space-y-3">
          <AuthFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
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

        {error && (
          <p role="alert" className="mt-3 text-sm">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
