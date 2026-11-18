import { useId } from "react";
import { FiMail } from "react-icons/fi";
import InputField from "./InputField";

export default function AuthFields({
  email,
  setEmail,
  password,
  setPassword,
  isSignup = false,
  emailError,
  passwordError,
  passwordVisible,
  onTogglePassword,
}) {
  const id = useId();

  return (
    <>
      <InputField
        id={`${id}-email`}
        htmlFor={`${id}-email`}
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        icon={FiMail}
        error={emailError}
        required
      />

      <InputField
        id={`${id}-password`}
        htmlFor={`${id}-password`}
        name="password"
        type="password"
        autoComplete={isSignup ? "new-password" : "current-password"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
        error={passwordError}
        passwordVisible={passwordVisible}
        onTogglePassword={onTogglePassword}
        passwordToggleLabel={isSignup ? "both passwords" : "password"}
        required
      />
    </>
  );
}