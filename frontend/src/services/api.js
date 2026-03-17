const API_BASE_URL = "http://127.0.0.1:8000";
export const AUTH_TOKEN_KEY = "authToken";

export async function loginUser(email, password) {
	const response = await fetch(`${API_BASE_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(data.detail || "Login failed");
	}
	return data;
}

export async function registerUser({ name, occupation, email, password }) {
	const response = await fetch(`${API_BASE_URL}/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, occupation, email, password }),
	});

	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(data.detail || "Registration failed");
	}
	return data;
}

export async function verifyAuthToken(token) {
	const response = await fetch(`${API_BASE_URL}/auth/verify`, {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!response.ok) {
		return false;
	}

	const data = await response.json().catch(() => ({}));
	return Boolean(data.authenticated);
}

export async function getAuthenticatedUser(token) {
	const response = await fetch(`${API_BASE_URL}/auth/verify`, {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});

	if (!response.ok) {
		return null;
	}

	const data = await response.json().catch(() => ({}));
	if (!data.authenticated || !data.user) {
		return null;
	}

	return data.user;
}
