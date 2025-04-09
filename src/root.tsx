import { Outlet } from "react-router";

export async function loader() {
	return {};
}

export default function Root() {
	return <Outlet />;
}
