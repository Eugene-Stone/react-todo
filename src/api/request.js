
const BASE_URL = "http://localhost:3001";

export async function request(endpoint, options = {}) {
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",
		},
		...options,
	});

	if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

	return response.json();
}
