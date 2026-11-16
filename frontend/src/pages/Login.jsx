import { useState } from "react";
import { login } from "../services/authService";
import InputField from "../components/InputField";
import WashStudio from "../assets/wash-studio.jpg";

const Login = () => {
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
    <main className="flex h-screen font-outfit">
      <div className="flex flex-col flex-1 w-full h-full justify-center items-center">
        <div className="fixed top-0 left-0 bg-primary text-white rounded-full size-9 flex items-center justify-center m-8">
          <p>X</p>
        </div>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-primary px-4 w-full py-3 text-white mb-4"
          >
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>

          <div className="text-center">
            <p className="text-sm">Forgot password?</p>
          </div>

          {error && <p role="alert">{error}</p>}
        </form>
      </div>

      <div className="hidden lg:block lg:w-full lg:flex-2">
        <img src={WashStudio} alt="" className="h-full object-cover" />
      </div>
    </main>
  );
};

export default Login;
