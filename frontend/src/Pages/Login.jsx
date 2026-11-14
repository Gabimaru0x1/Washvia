import { useState } from "react";
import { login } from "../services/authService";

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
    <main>
      <h1>Log in to Washvia</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="block rounded border border-gray-500 bg-white px-3 py-2 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="block rounded border border-gray-500 bg-white px-3 py-2 text-black"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="rounded bg-primary px-4 py-2 text-white">
          {isSubmitting ? "Logging in…" : "Log in"}
        </button>

        {error && <p role="alert">{error}</p>}
      </form>
    </main>
  );
};

export default Login;
