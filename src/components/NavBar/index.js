import { LitElement, html, css } from "lit";
import "@jegdev/semaui";

const docsList = [
	{ title: "Introducción", path: "/docs/intro" },
	{ title: "Instalación", path: "/docs/install" },
	{ title: "Dark Mode", path: "/docs/theming" },
	{ title: "Accordion", path: "/docs/accordion" },
	{ title: "Alerts", path: "/docs/alerts" },
	{ title: "Breadcrumbs", path: "/docs/breadcrumbs" },
	{ title: "Button", path: "/docs/button" },
	{ title: "Card Product", path: "/docs/card-product" },
	{ title: "Card Feature", path: "/docs/card-feature" },
	{ title: "Card Info", path: "/docs/card-info" },
	{ title: "Dropdown", path: "/docs/dropdown" },
	{ title: "FAQs", path: "/docs/faqs" },
	{ title: "Input", path: "/docs/input" },
];

export class UiNavbar extends LitElement {
	static properties = {
		theme: { type: String, reflect: true },
		isMenuOpen: { type: Boolean, state: true },
		searchQuery: { type: String, state: true },
	};

	static styles = css`
		:host {
			display: block;
			position: sticky;
			top: 0;
			z-index: 100;
			--sema-bg: #ffffff;
			--primary: #da2b48;
			--border-color: #e5e7eb;
		}

		:host([theme="dark"]) {
			--sema-bg: #121212;
			--primary: #ffffff;
			--border-color: #333;
		}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.75rem 1.5rem;
			background: var(--sema-bg);
			backdrop-filter: blur(10px);
			border-bottom: 1px solid var(--border-color);
		}
		.logo-container {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			text-decoration: none;
		}
		.logo-text {
			color: var(--primary, #da2b48);
			font-size: 1.25rem;
			font-weight: 900;
			letter-spacing: -0.05em;
		}
		.nav-links {
			display: flex;
			gap: 1rem;
			align-items: center;
		}
		.search-container {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			background: #f3f4f6;
			padding: 0.6rem 1rem;
			border-radius: 8px;
			border: 1px solid #e5e7eb;
			transition: all 0.2s ease;
			color: #1f2937;
		}
		.search-container:hover {
			background: #e5e7eb;
		}
		.search-container:focus-within {
			background: #ffffff;
			border-color: #da2b48;
			box-shadow: 0 0 0 2px rgba(218, 43, 72, 0.1);
		}
		.search-container input {
			border: none;
			background: transparent;
			outline: none;
			font-family: inherit;
			font-size: 0.9rem;
			color: inherit;
			width: 240px;
		}
		.search-container input::placeholder {
			color: #9ca3af;
		}
		:host([theme="dark"]) .search-container {
			background: rgba(255, 255, 255, 0.15);
			color: white;
			border-color: rgba(255, 255, 255, 0.2);
		}
		:host([theme="dark"]) .search-container:hover {
			background: rgba(255, 255, 255, 0.25);
		}
		:host([theme="dark"]) .search-container:focus-within {
			background: rgba(255, 255, 255, 0.25);
			border-color: rgba(255, 255, 255, 0.5);
			box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
		}
		:host([theme="dark"]) .search-container input::placeholder {
			color: rgba(255, 255, 255, 0.8);
		}
		.search-wrapper {
			position: relative;
		}
		.search-results {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background: var(--swiss-gray, #f3f4f6);
			color: #171212;
			border: 1px solid var(--border-color);
			border-radius: 4px;
			margin-top: 0.5rem;
			max-height: 300px;
			overflow-y: auto;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
			z-index: 1000;
		}
		:host([theme="dark"]) .search-results {
			background: #121212;
			color: #ffffff;
			border-color: #333;
		}
		.search-item {
			display: block;
			padding: 0.75rem 1rem;
			text-decoration: none;
			color: inherit;
			font-size: 0.875rem;
			cursor: pointer;
		}
		.search-item:hover {
			background: rgba(0, 0, 0, 0.05);
		}
		.mobile-menu {
			display: none;
		}
		@media (max-width: 768px) {
			.nav-links {
				display: none;
			}
			.nav-links.open {
				display: flex;
				flex-direction: column;
				position: absolute;
				top: 100%;
				left: 0;
				right: 0;
				background: var(--sema-bg, #ffffff);
				padding: 1rem;
				border-bottom: 1px solid var(--border-color, #e5e7eb);
			}
			.search-container {
				display: none;
			}
			.mobile-menu {
				display: block;
			}
		}
	`;

	constructor() {
		super();
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

	_handleSearch = (e) => {
		this.searchQuery = e.target.value;
	};

	_clearSearch = () => {
		this.searchQuery = "";
	};

	_getFilteredDocs() {
		if (!this.searchQuery) return [];
		const term = this.searchQuery.toLowerCase();
		return docsList.filter((doc) => doc.title.toLowerCase().includes(term));
	}

	render() {
		const iconNight = html`<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 312.812 312.812"
			xml:space="preserve"
			style="fill: currentColor"
		>
			<path
				d="M305.2 178.159c-3.2-.8-6.4 0-9.2 2-10.4 8.8-22.4 16-35.6 20.8-12.4 4.8-26 7.2-40.4 7.2-32.4 0-62-13.2-83.2-34.4s-34.4-50.8-34.4-83.2c0-13.6 2.4-26.8 6.4-38.8 4.4-12.8 10.8-24.4 19.2-34.4 3.6-4.4 2.8-10.8-1.6-14.4-2.8-2-6-2.8-9.2-2-34 9.2-63.6 29.6-84.8 56.8-20.4 26.8-32.4 60-32.4 96 0 43.6 17.6 83.2 46.4 112s68 46.4 112 46.4c36.8 0 70.8-12.8 98-34 27.6-21.6 47.6-52.4 56-87.6 1.6-5.6-1.6-11.2-7.2-12.4"
			/>
		</svg>`;

		const iconLight = html`<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			style="fill: currentColor"
			xml:space="preserve"
		>
			<circle cx="12" cy="12" r="6" />
			<path
				d="M12 4.5c.28 0 .5-.22.5-.5V2c0-.28-.22-.5-.5-.5s-.5.22-.5.5v2c0 .28.22.5.5.5m0 15c-.28 0-.5.22-.5.5v2c0 .28.22.5.5.5s.5-.22.5-.5v-2c0-.28-.22-.5-.5-.5m10-8h-2c-.28 0-.5.22-.5.5s.22.5.5.5h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5m-18 0H2c-.28 0-.5.22-.5.5s.22.5.5.5h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5m13.66-4.66c.13 0 .26-.05.35-.15l1.41-1.41c.2-.2.2-.51 0-.71s-.51-.2-.71 0L17.3 5.98c-.2.2-.2.51 0 .71.1.1.23.15.35.15zM5.99 17.3l-1.41 1.41c-.2.2-.2.51 0 .71a.485.485 0 0 0 .7 0l1.41-1.41c.2-.2.2-.51 0-.71s-.51-.2-.71 0zm12.02 0c-.2-.2-.51-.2-.71 0s-.2.51 0 .71l1.41 1.41a.485.485 0 0 0 .7 0c.2-.2.2-.51 0-.71L18 17.3zM5.99 6.7a.485.485 0 0 0 .7 0c.2-.2.2-.51 0-.71L5.28 4.58c-.2-.2-.51-.2-.71 0s-.2.51 0 .71L5.98 6.7z"
			/>
		</svg>`;

		const iconSearch = html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 29 29"
				xml:space="preserve"
				style="fill: currentColor"
			>
				<path
					d="m27.414 24.586-5.077-5.077A9.93 9.93 0 0 0 24 14c0-5.514-4.486-10-10-10S4 8.486 4 14s4.486 10 10 10a9.93 9.93 0 0 0 5.509-1.663l5.077 5.077a2 2 0 1 0 2.828-2.828M7 14c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7"
					data-original="#000000"
				/>
			</svg>
		`;

		const iconMenu = html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 464.205 464.205"
				xml:space="preserve"
				style="fill: currentColor"
			>
				<path
					d="M435.192 406.18H29.013C12.989 406.18 0 393.19 0 377.167s12.989-29.013 29.013-29.013h406.18c16.023 0 29.013 12.99 29.013 29.013-.001 16.023-12.99 29.013-29.014 29.013m0-145.065H29.013C12.989 261.115 0 248.126 0 232.103s12.989-29.013 29.013-29.013h406.18c16.023 0 29.013 12.989 29.013 29.013s-12.99 29.012-29.014 29.012m0-145.064H29.013C12.989 116.051 0 103.062 0 87.038s12.989-29.013 29.013-29.013h406.18c16.023 0 29.013 12.989 29.013 29.013s-12.99 29.013-29.014 29.013"
					data-original="#000000"
				/>
			</svg>
		`;

		const currentIcon = this.theme === "dark" ? iconLight : iconNight;

		return html`
			<header>
				<a href="/" class="logo-container">
					<img src="/src/assets/logo.webp" width="30" alt="Sema UI Logo" />
					<span class="logo-text">SEMA UI</span>
				</a>
				<div class="search-wrapper">
					<div class="search-container">
						${iconSearch}
						<input
							placeholder="Buscar..."
							.value="${this.searchQuery || ""}"
							@input="${this._handleSearch}"
						/>
					</div>
					${this.searchQuery
						? html`
								<div class="search-results">
									${this._getFilteredDocs().map(
										(doc) => html`
											<a
												href="${doc.path}"
												class="search-item"
												@click="${this._clearSearch}"
											>
												${doc.title}
											</a>
										`,
									)}
									${this._getFilteredDocs().length === 0
										? html`<div class="search-item">No hay resultados</div>`
										: ""}
								</div>
							`
						: ""}
				</div>
				<nav class="nav-links ${this.isMenuOpen ? "open" : ""}">
					<sema-button kind="link" url="/docs" mode="nav-link"
						>Docs</sema-button
					>
					<sema-button
						custom="on"
						firstColor="#da2b48"
						secondaryColor="#fff"
						rounded="circle"
						@click="${this._dispatchToggle}"
					>
						${currentIcon}
					</sema-button>
				</nav>
				<sema-button
					size="sm"
					mode="menu"
					custom="on"
					firstColor="#fff"
					secondaryColor="#da2b48"
					class="mobile-menu"
					@click="${this._toggleMenu}"
				>
					${iconMenu}
				</sema-button>
			</header>
		`;
	}

	_toggleMenu = () => {
		this.isMenuOpen = !this.isMenuOpen;
	};

	_dispatchToggle() {
		this.dispatchEvent(
			new CustomEvent("toggle-theme", {
				bubbles: true,
				composed: true,
			}),
		);
	}
}
customElements.define("ui-navbar", UiNavbar);
