import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import CustomBackground from "./CustomBackground";
import Head from "next/head";

export default function Layout({ children, title }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/wildme.png" />
			</Head>
			<div className="isolate bg-white">
				<CustomBackground />
				<Navbar />
				<main className="min-h-screen">{children}</main>
				<Footer />
			</div>
		</>
	);
}
