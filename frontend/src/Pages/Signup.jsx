import { useState } from "react";
import { signup } from "../services/authService";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      await signup({ email, password });
      setPassword("");
      setSuccess("Account created. You can now log in.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Create your Washvia account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="block rounded border border-gray-500 bg-white px-3 py-2 text-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-primary px-4 py-2 text-white"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        {error && <p role="alert">{error}</p>}
        {success && <output aria-live="polite">{success}</output>}
      </form>
    </main>
  );
};

export default Signup;
