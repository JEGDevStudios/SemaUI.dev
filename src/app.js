import { Router } from "@vaadin/router";
import "./components/NavBar";
import "./components/Footer";
import "./pages/page-home.js";
import "./pages/page-docs.js";
import "./pages/docs/page-intro.js"; // Asegúrate de importar la nueva vista
import "./pages/docs/page-install.js";
import "./pages/docs/page-accordion.js";
import "./pages/docs/page-theming.js";
import "./pages/docs/page-alerts.js";
import "./pages/docs/page-breadcrumbs.js";
import "./pages/docs/page-button.js";
import "./pages/docs/page-card-product.js";
import "./pages/docs/page-dropdown.js";
import "./pages/docs/page-faqs.js";
import "./pages/docs/page-input.js";
import "./pages/docs/page-card-feature.js";
import "./pages/docs/page-card-info.js";

const outlet = document.getElementById("outlet");
const router = new Router(outlet);

// Global Theme Handler
document.addEventListener("toggle-theme", () => {
	const html = document.documentElement;
	const current = html.getAttribute("data-theme");
	const next = current === "dark" ? "light" : "dark";
	html.setAttribute("data-theme", next);
	localStorage.setItem("theme", next);
});

// Init Theme
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (saved === "dark" || (!saved && prefersDark)) {
	document.documentElement.setAttribute("data-theme", "dark");
}

router.setRoutes([
	{ path: "/", component: "page-home" },
	{
		path: "/docs",
		component: "page-docs",
		children: [
			{ path: "/", redirect: "/docs/intro" },
			{ path: "/intro", component: "page-intro" },
			{ path: "/install", component: "page-install" },
			{ path: "/theming", component: "page-theming" },
			{ path: "/accordion", component: "page-accordion" },
			{ path: "/alerts", component: "page-alerts" },
			{ path: "/breadcrumbs", component: "page-breadcrumbs" },
			{ path: "/button", component: "page-button" },
			{ path: "/card-product", component: "page-card-product" },
			{ path: "/dropdown", component: "page-dropdown" },
			{ path: "/faqs", component: "page-faqs" },
			{ path: "/input", component: "page-input" },
			{ path: "/card-feature", component: "page-card-feature" },
			{ path: "/card-info", component: "page-card-info" },
			// Aquí irán las demás cuando las crees
		],
	},
]);
