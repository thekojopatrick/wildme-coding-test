import type { NextPage } from "next";
import { useState } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState<any>({
		latency: null,
		status: null,
		headers: {
			"X-RateLimit-Limit": "",
			"X-RateLimit-Remaining": "",
			"X-RateLimit-Reset": "",
		},
		data: null,
	});
	const handleFetch = async (e: any) => {
		e.preventDefault();
		const start = Date.now();
		setLoading(true);

		try {
			const res = await fetch("/api/auth/login");

			setState({
				latency: `~${Math.round(Date.now() - start)}ms`,
				status: `${res.status}`,
				rateLimitState: {
					"X-RateLimit-Limit": res.headers.get("X-RateLimit-Limit"),
					"X-RateLimit-Remaining": res.headers.get("x-RateLimit-Remaining"),
					"X-RateLimit-Reset": res.headers.get("x-RateLimit-Reset"),
				},
				data: res.headers.get("Content-Type")?.includes("application/json") ? await res.json() : null,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout title={"Rate Limiter App"}>
			<div className="relative flex min-h-screen flex-col items-center justify-center py-2 px-6 lg:justify-start lg:px-8">
				<div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
					<div>
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
								<span className="text-gray-600">
									See how it was built.{" "}
									<a href="#" className="font-semibold text-cyan-600">
										<span className="absolute inset-0" aria-hidden="true" />
										Read more <span aria-hidden="true">&rarr;</span>
									</a>
								</span>
							</div>
						</div>
						<div>
							<h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
								Rate Limiter App using Token Bucket Alogrithm
							</h1>
							<p className="mt-6 mb-8 text-center text-lg leading-8 text-gray-600">
								A rate limiter application built with Nextjs,TailwindCSS, Redis & Upstash,
								<br />
								By using Redis with Upstash we can keep a counter of requests by IP at the edge. For the demo below you
								can send a maximum of <span className="font-medium text-black">5 requests every 60 seconds(1min)</span>.
							</p>
							<pre
								className={`border-accents-2 overflow-x-auto rounded-md border bg-white p-6 text-black transition-all ${
									loading && ` opacity-50`
								}`}
							>
								{JSON.stringify(state, null, 2)}
							</pre>
							<div className="m-6 flex items-center justify-center">
								<a
									href="#"
									onClick={handleFetch}
									className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
								>
									Make Login Request
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
