import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import styles from "./App.css?url";
import type { PropsWithChildren } from "react";

export const links = () => [
	{
		rel: "stylesheet",
		href: styles,
		as: "style",
	},
];

export async function loader() {
	return {};
}

export default function Root() {
	return <Outlet />;
}

export function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
