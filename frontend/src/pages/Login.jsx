import { useState } from "react";
import { login } from "../services/authService";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = ({ onClose }) => {
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
      <main className="relative flex-center flex-col lg:w-lg md:w-md w-sm h-[70%] bg-white rounded-lg">
        <Button
          type="button"
          onClick={onClose}
          className="gap-1 absolute right-0 top-0 size-12 rounded-full my-3 mx-7"
        >
          <p className="text-2xl">×</p>
          <p>Close</p>
        </Button>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Log In</h1>
          <p className="text-gray-400">or create an account</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-[300px]">
          <div className="space-y-3 mb-5">
            <InputField
              htmlFor="email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Email"
            />

            <InputField
              htmlFor="password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Password"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary w-full text-white px-4 py-3 mb-4"
          >
            {isSubmitting ? "Logging in…" : "Log in"}
          </Button>

          <div className="text-center">
            <p className="text-sm">Forgot password?</p>
          </div>

          {error && <p role="alert">{error}</p>}
        </form>
      </main>
  );
};

export default Login;
