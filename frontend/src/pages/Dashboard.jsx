import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { logout } from "../services/auth.js";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch("/api/v1/users/me", {
          credentials: "include",
          signal: controller.signal,
        });

        if (response.status === 401) {
          setStatus("signed-out");
          return;
        }

        if (!response.ok) {
          throw new Error(`Could not load profile (HTTP ${response.status})`);
        }

        const data = await response.json();
        setProfile(data);
        setStatus("ready");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Dashboard failed:", error);
          setStatus("error");
        }
      }
    }

    void loadProfile();

    return () => controller.abort();
  }, []);

  async function handleLogout() {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
      setProfile(null);
      setStatus("signed-out");
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError("Could not log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (status === "signed-out") {
    return <Navigate to="/" replace />;
  }

  if (status === "loading") {
    return <p>Loading your dashboard…</p>;
  }

  if (status === "error") {
    return <p>Could not load your dashboard. Try refreshing.</p>;
  }

  const firstName = profile?.first_name?.trim();

  return (
    <>
      <h1>{`Hello, ${firstName}!`}</h1>

      <button type="button" onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? "Logging out…" : "Log out"}
      </button>

      {logoutError && <p role="alert">{logoutError}</p>}
    </>
  );
}