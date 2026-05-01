const BASE_URL = 'http://localhost:3001';

interface RequestOptions extends RequestInit {
	method?: string;
	body?: string;
}

export async function request(endpoint: string, options: RequestOptions = {}): Promise<any> {
	const response = await fetch(`${BASE_URL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		...options,
	});

	if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

	return response.json();
}
