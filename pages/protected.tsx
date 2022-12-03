import React, { useEffect } from "react";
import { NextPage } from "next";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Layout from "components/Layout";

const Protected: NextPage = (): JSX.Element => {
	const { status } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") Router.replace("/login");
	}, [status]);

	if (status === "authenticated") {
		return (
			<Layout title={"Welcome"}>
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
							<div className="flex flex-col gap-8">
								<h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">Welcome to Dashboard</h1>
								<p className="mt-6 text-center text-lg leading-8 text-gray-600">
									A rate limiter application built with Nextjs,TailwindCSS, Redis & Upstash,
								</p>
								<h3 className="text-center text-lg font-bold">Helper Resources</h3>
								<ul className="space-y-4">
									<li className="text-base">
										<a href="https://upstash.com/blog/serverless-rate-limiting">
											Rate Limiting Your Serverless Applications
										</a>
									</li>
									<li className="text-base">
										<a href="https://cloud.google.com/architecture/rate-limiting-strategies-techniques">
											Feedback Rate-limiting strategies and techniques
										</a>
									</li>
									<li className="text-base">
										<a href="https://www.youtube.com/watch?v=MR_BN1Ricjw">
											Design A Scalable Rate Limiter | System Design - Youtube
										</a>
									</li>
									<li className="text-base">
										<a href="https://flawsomedev.com/posts/ratelimit-nodejs/">
											How to implement your own rate limiter?
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	return <div>Loading</div>;
};

export default Protected;
