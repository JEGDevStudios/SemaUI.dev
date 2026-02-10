import { LitElement, html, css } from "lit";
import "@jegdev/semaui";
import "../components/SemaNavItem";

export class SemaDocs extends LitElement {
	static properties = {
		theme: { type: String, reflect: true },
		isSidebarOpen: { type: Boolean, state: true },
	};

	static styles = css`
		:host {
			--primary: #da2b48;
			--bg-light: #f3f4f6;
			--bg-dark: #121212;
			--text-main: #171212;
			--border-color: #e5e7eb;
			--swiss-gray: #f3f4f6;

			display: grid;
			grid-template-columns: 260px 1fr;
			height: calc(100vh - 60px); /* Ajuste para el navbar sticky */
			overflow: hidden;
			background-color: var(--bg-light);
			color: var(--text-main);
		}

		:host([theme="dark"]) {
			--bg-light: #121212;
			--text-main: #ffffff;
			--border-color: #333;
			--swiss-gray: #111;
		}

		:host([theme="dark"]) sema-nav-item {
			--nav-item-color: #9ca3af;
			--nav-item-active-color: #ffffff;
			--nav-item-bg-active: #222;
		}

		aside {
			border-right: 1px solid var(--border-color, #e5e7eb);
			padding: 2rem 1rem;
			height: 100%;
			overflow-y: auto;
		}
		main {
			height: 100%;
			overflow-y: auto;
			padding: 0;
			position: relative;
		}
		.content-wrapper {
			max-width: 900px;
			margin: 0 auto;
			padding: 3rem;
		}
		.nav-list {
			list-style: none;
			padding: 0;
			margin: 0;
		}
		.sidebar-nav h3 {
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: #9ca3af;
			margin-bottom: 1rem;
		}
		.nav-group {
			margin-bottom: 2rem;
		}
		.nav-group-title {
			font-size: 11px;
			font-weight: 800;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: #9ca3af;
			padding: 0 12px;
			margin-bottom: 8px;
		}
		.nav-item {
			margin-bottom: 0.5rem;
		}
		code {
			background: var(--swiss-gray, #f3f4f6);
			padding: 0.2rem 0.4rem;
			border-radius: 4px;
			font-family: monospace;
		}

		.mobile-toggle {
			display: none;
			align-items: center;
			gap: 0.5rem;
			padding: 1rem;
			background: var(--bg-light);
			border-bottom: 1px solid var(--border-color);
			cursor: pointer;
			position: sticky;
			top: 0;
			z-index: 10;
			font-weight: 600;
		}

		.backdrop {
			display: none;
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 40;
			backdrop-filter: blur(2px);
		}

		@media (max-width: 768px) {
			:host {
				display: block;
				height: auto;
			}
			aside {
				display: none;
				position: fixed;
				top: 60px; /* Altura aproximada del navbar */
				left: 0;
				bottom: 0;
				width: 280px;
				background: var(--bg-light);
				z-index: 50;
				border-right: 1px solid var(--border-color);
				box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
			}
			aside.open {
				display: block;
			}
			.mobile-toggle {
				display: flex;
			}
			.backdrop.open {
				display: block;
			}
		}
	`;

	constructor() {
		super();
		// Sincronizar con el estado global o localStorage al iniciar
		this.theme = localStorage.getItem("theme") || "light";
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("toggle-theme", this._handleThemeUpdate);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener("toggle-theme", this._handleThemeUpdate);
	}

	_handleThemeUpdate = () => {
		this.theme = document.documentElement.getAttribute("data-theme") || "light";
	};

	toggleTheme() {
		this.theme = this.theme === "light" ? "dark" : "light";
		// Emitir evento global para que app.js actualice el <html> y localStorage
		this.dispatchEvent(
			new CustomEvent("toggle-theme", {
				bubbles: true,
				composed: true,
			}),
		);
	}

	_toggleSidebar() {
		this.isSidebarOpen = !this.isSidebarOpen;
	}

	_handleNavClick() {
		if (window.innerWidth <= 768) {
			this.isSidebarOpen = false;
		}
	}

	render() {
		return html`
			<div class="mobile-toggle" @click="${this._toggleSidebar}">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
				<span>Menú</span>
			</div>
			<div
				class="backdrop ${this.isSidebarOpen ? "open" : ""}"
				@click="${this._toggleSidebar}"
			></div>
			<aside class="${this.isSidebarOpen ? "open" : ""}">
				<nav @click="${this._handleNavClick}">
					<div class="nav-group">
						<div class="nav-group-title">Getting Started</div>
						<ul class="nav-list">
							<li>
								<sema-nav-item href="/docs/intro" active
									>Introducción</sema-nav-item
								>
							</li>
							<li>
								<sema-nav-item href="/docs/install">Instalación</sema-nav-item>
							</li>
							<li>
								<sema-nav-item href="/docs/theming">Dark Mode</sema-nav-item>
							</li>
						</ul>
					</div>

					<div class="nav-group">
						<div class="nav-group-title">Components</div>
						<ul class="nav-list">
							<li>
								<sema-nav-item href="/docs/accordion"
									>Sema Accordion</sema-nav-item
								>
							</li>
							<li>
								<sema-nav-item href="/docs/alerts">Sema Alerts</sema-nav-item>
							</li>
							<li>
								<sema-nav-item href="/docs/breadcrumbs"
									>Sema Breadcrumbs</sema-nav-item
								>
							</li>
							<li>
								<sema-nav-item href="/docs/button">Sema Button</sema-nav-item>
							</li>
							<li>
								<sema-nav-item href="/docs/card-product"
									>Sema Card Product</sema-nav-item
								>
							</li>
							<li>
								<sema-nav-item href="/docs/card-feature"
									>Sema Card Feature</sema-nav-item
								>
							</li>
							<li>
								<sema-nav-item href="/docs/card-info"
									>Sema Card Info</sema-nav-item
								>
							</li>
							<li>
								<sema-nav-item href="/docs/dropdown"
									>Sema Dropdown</sema-nav-item
								>
							</li>
							<li>
								<sema-nav-item href="/docs/faqs">Sema FAQs</sema-nav-item>
							</li>
							<li>
								<sema-nav-item href="/docs/input">Sema Input</sema-nav-item>
							</li>
						</ul>
					</div>
				</nav>
			</aside>
			<main>
				<div class="content-wrapper">
					<slot></slot>
				</div>
			</main>
		`;
	}
}
customElements.define("page-docs", SemaDocs);
