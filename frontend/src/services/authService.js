const AUTH_URL = "/api/v1/auth";

async function getCsrfToken() {
  const response = await fetch(`${AUTH_URL}/csrf/`);

  if (!response.ok) {
    throw new Error("Could not start signup. Please try again.");
  }

  const data = await response.json();

  if (!data.csrf_token) {
    throw new Error("Flask did not return a CSRF token.");
  }

  return data.csrf_token;
}

export async function signup(formData) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${AUTH_URL}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      typeof data?.error === "string"
        ? data.error
        : "Signup failed. Please try again.";

    throw new Error(message);
  }
}

export async function login({ email, password }) {
  const csrfToken = await getCsrfToken();

  const response = await fetch(`${AUTH_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      typeof data?.error === "string"
        ? data.error
        : "Could not log in. Please try again.";

    throw new Error(message);
  }
}