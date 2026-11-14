import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const response = await fetch("/api/v1/user/dashboard", {
          credentials: "include",
          signal: controller.signal,
        });

        if (response.status === 401) {
          setStatus("signed-out");
          return;
        }

        if (!response.ok) throw new Error("Could not load profile");

        setProfile(await response.json());
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

  if (status === "signed-out") return <Navigate to="/login" replace />;
  if (status === "loading") return <p>Loading your dashboard…</p>;
  if (status === "error")
    return <p>Could not load your dashboard. Try refreshing. {profile?.name}</p>;

  return <h1>Welcome back, {profile.first_name}!</h1>;
}
