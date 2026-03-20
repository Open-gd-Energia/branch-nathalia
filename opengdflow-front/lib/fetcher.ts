import { getAccessToken } from "./get-access-token";

export type FetcherOptions = {
	method?: string;
	headers?: HeadersInit;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	body?: any;
	params?: Record<string, string | number | boolean>;
};

export type FetcherResponse<T = unknown> = {
	data: T;
	status: number;
};

export type FetcherError = {
	message: string;
	status: number;
	data: unknown;
};

// No servidor (ex.: Docker) use API_URL_SERVER para alcançar o backend pela rede interna
const BASE_URL =
	typeof window === "undefined"
		? (process.env.API_URL_SERVER ?? process.env.NEXT_PUBLIC_API_URL ?? "")
		: (process.env.NEXT_PUBLIC_API_URL ?? "");

export async function fetcher<T = unknown>(
	route: string,
	options: FetcherOptions = {},
): Promise<FetcherResponse<T>> {
	const { method = "GET", headers = {}, body, params, ...other } = options;

	let url = `${BASE_URL}${route}`;
	if (params) {
		const searchParams = new URLSearchParams(
			Object.entries(params).reduce(
				(acc, [key, value]) => ({
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					...acc,
					[key]: String(value),
				}),
				{} as Record<string, string>,
			),
		);
		url += `?${searchParams.toString()}`;
	}

	// ✅ Try to get the token from cookies
	const token = await getAccessToken();

	// ✅ Build final headers
	const finalHeaders: HeadersInit = {
		"Content-Type": "application/json",
		...headers,
		...(token && { Authorization: `Bearer ${token}` }),
	};

	const res = await fetch(url, {
		method,
		headers: finalHeaders,
		...(body && { body: JSON.stringify(body) }),
		...other,
	});

	const contentType = res.headers.get("content-type");
	const data = contentType?.includes("application/json")
		? await res.json()
		: await res.text();

	if (!res.ok) {
		throw {
			message: data?.message ?? res.statusText,
			status: res.status,
			data,
		};
	}

	return { data, status: res.status };
}
