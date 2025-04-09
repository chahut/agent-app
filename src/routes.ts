import {
	type RouteConfig,
	route,
	index,
	layout,
	prefix,
} from "@react-router/dev/routes";

export default [
	layout("./routes/layout.tsx", [route("", "./routes/chat.tsx")]),
] satisfies RouteConfig;
