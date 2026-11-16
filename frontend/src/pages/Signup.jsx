import { useState } from "react";
import { signup } from "../services/authService";
import InputField from "../components/InputField";
import WashStudio from "../assets/wash-studio.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
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
      await signup({ email, phone_number, password });
      setPassword("");
      setSuccess("Account created. You can now log in.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex h-screen font-outfit">
      <div className="flex flex-col flex-1 w-full h-full justify-center items-center">
        <div className="fixed top-0 left-0 bg-primary text-white rounded-full size-9 flex items-center justify-center m-8">
          <p>X</p>
        </div>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-gray-400">or log in existing account</p>
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
              placeholder="Email address"
            />

            <InputField
              htmlFor="phone"
              id="phone"
              name="phone"
              type="tel"
              value={phone_number}
              onChange={(event) => setPhone(event.target.value)}
              required
              placeholder="Phone number"
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

            <InputField
              htmlFor="password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-primary px-4 w-full py-3 text-white"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>

          {error && <p role="alert">{error}</p>}
          {success && <output aria-live="polite">{success}</output>}
        </form>
      </div>

      <div className="hidden lg:block lg:w-full lg:flex-2">
        <img src={WashStudio} alt="" className="h-full object-cover" />
      </div>
    </main>
  );
};

export default Signup;
