import { LitElement, html, css } from "lit";
import "@jegdev/semaui";

export class SemaHome extends LitElement {
	static properties = {
		theme: { type: String, reflect: true },
	};

	constructor() {
		super();
		this.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}

	static styles = css`
		:host {
			--primary: #da2b48;
			--bg-light: #ffffff;
			--bg-dark: #121212;
			--text-main: #171212;
			--border-color: #e5e7eb;
			--swiss-gray: #f3f4f6;

			display: block;
			font-family: "Inter", sans-serif;
			color: var(--text-main);
			background-color: var(--bg-light);
			box-sizing: border-box;
		}

		/* Soporte Dark Mode automático si el usuario lo prefiere */
		:host([theme="dark"]) {
			--bg-light: #121212;
			--text-main: #ffffff;
			--border-color: #333;
			--swiss-gray: #111;
		}

		/* Layout & Utilities */
		.container {
			padding: 0 1.5rem;
		}

		.swiss-grid {
			position: absolute;
			inset: 0;
			z-index: -1;
			opacity: 0.6;
			background-size: 40px 40px;
			background-image:
				linear-gradient(to right, var(--border-color) 1px, transparent 1px),
				linear-gradient(to bottom, var(--border-color) 1px, transparent 1px);
		}

		/* Navbar */
		nav {
			position: sticky;
			top: 0;
			z-index: 50;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 1.5rem;
			background: rgba(255, 255, 255, 0.9);
			backdrop-filter: blur(10px);
			border-bottom: 1px solid var(--border-color);
		}

		.logo {
			color: var(--primary);
			font-size: 1.25rem;
			font-weight: 900;
			letter-spacing: -0.05em;
			text-transform: uppercase;
			margin: 0;
		}

		.nav-links {
			display: none;
			gap: 1.5rem;
			list-style: none;
			padding: 0;
			margin: 0;
		}

		@media (min-width: 768px) {
			.nav-links {
				display: flex;
			}
		}

		.nav-links a {
			color: var(--text-main);
			text-decoration: none;
			font-size: 0.875rem;
			font-weight: 500;
			transition: color 0.2s;
		}

		.nav-links a:hover {
			color: var(--primary);
		}

		.nav-icons {
			display: flex;
			gap: 1rem;
			color: #9ca3af;
		}

		.__logo {
			width: 34px;
		}

		/* Hero Section */
		.hero {
			position: relative;
			padding: 4rem 1.5rem 3rem;
			border-bottom: 1px solid var(--border-color);
			overflow: hidden;
		}

		.hero-content {
			max-width: 450px;
			margin: 0 auto;
		}

		.badge {
			display: inline-block;
			padding: 0.25rem 0.75rem;
			margin-bottom: 1.5rem;
			border: 2px solid var(--primary);
			color: var(--primary);
			font-size: 10px;
			font-weight: 900;
			letter-spacing: 0.2em;
			text-transform: uppercase;
		}

		h1 {
			font-size: 3rem;
			font-weight: 900;
			line-height: 1;
			letter-spacing: -0.04em;
			margin-bottom: 1.5rem;
		}

		.hero p {
			color: #4b5563;
			font-size: 1.125rem;
			line-height: 1.4;
			margin-bottom: 2rem;
		}

		/* Buttons */
		.btn-group {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		button {
			height: 3.5rem;
			border: none;
			font-weight: 700;
			text-transform: uppercase;
			cursor: pointer;
			transition: opacity 0.2s;
		}

		/* Feature Grid */
		.features {
			padding: 4rem 1.5rem;
			background: var(--swiss-gray);
		}

		.card {
			background: var(--bg-light);
			padding: 1.5rem;
			border: 1px solid var(--border-color);
			margin-bottom: 1rem;
		}

		.card h4 {
			margin: 0.5rem 0;
			font-weight: 900;
			text-transform: uppercase;
		}

		/* Faqs*/
		.faqs {
			padding: 0 1.5rem 4rem;
			background: var(--swiss-gray);
		}
		/* Footer */
		footer {
			padding: 4rem 1.5rem;
			background: #171212;
			color: white;
		}

		.footer-links {
			display: flex;
			gap: 1.5rem;
			list-style: none;
			padding: 0;
			margin: 2rem 0 0 0;
		}

		.footer-links a {
			color: #9ca3af;
			text-decoration: none;
			font-size: 0.875rem;
			font-weight: 500;
			transition: color 0.2s;
		}

		.footer-links a:hover {
			color: white;
		}

		.footer-copy {
			font-size: 10px;
			color: #6b7280;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			margin-top: 2rem;
			padding-top: 2rem;
			border-top: 1px solid #333;
		}

		@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined");
	`;

	toggleTheme() {
		this.theme = this.theme === "light" ? "dark" : "light";
	}

	render() {
		const faqs = [
			{
				question: "What is Sema UI?",
				answer:
					"Sema UI is a lightweight, framework-agnostic Web Component library built with Lit. It focuses on performance, minimalism, and Swiss design principles.",
			},
			{
				question: "Why Lit?",
				answer:
					"Lit provides a thin layer over standard Web Components, ensuring blazing fast performance and future-proof compatibility without the bloat of larger frameworks.",
			},
			{
				question: "Can I use it with React or Vue?",
				answer:
					"Yes! Since Sema UI is built on web standards, it works seamlessly with any framework (React, Vue, Angular, Svelte) or with vanilla JavaScript.",
			},
		];

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

		return html`
			<nav>
				<sema-button
					mode="logo"
					kind="link"
					url="/docs"
					altText="Enlace a la documentación"
					size="lg"
					custom="on"
					firstColor="#fff"
					secondaryColor="#da2b48"
				>
					<img src="/src/assets/logo.webp" class="__logo"/>
					<h2 class="logo">SEMA UI</h2>
				</sema-button>

				<ul class="nav-links">
					<li>
						<sema-button
							mode="nav-link"
							kind="link"
							url="/docs"
							altText="Enlace a la documentación"
							rounded="circle"
							custom="on"
							firstColor="#fff"
							secondaryColor="#da2b48"
							>Documentation</sema-button
						>
					</li>
					<li>
						<sema-dropdown
							color="#da2b48"
							label="Components"
							items='[{"label": "Perfil", "path": "/perfil"}, {"label": "Salir", "path": "/logout"}]'
						></sema-dropdown>
					</li>
					<li>
						<sema-button
							mode="nav-link"
							kind="link"
							url="https://github.com/JEGDevStudios/Sema-UI"
							altText="Enlace a la documentación"
							rounded="circle"
							custom="on"
							firstColor="#fff"
							secondaryColor="#da2b48"
							>GitHub</sema-button
						>
					</li>
				</ul>

				<div class="nav-icons">
					<sema-button
						rounded="circle"
						custom="on"
						firstColor="#fff"
						secondaryColor="#da2b48"
						@click="${this.toggleTheme}"
						>${this.theme === "dark" ? iconNight : iconLight}</sema-button
					>
					<sema-button
						rounded="circle"
						custom="on"
						firstColor="#fff"
						secondaryColor="#da2b48"
						>${iconSearch}</sema-button
					>
					<sema-button
						mode="nemu"
						custom="on"
						firstColor="#fff"
						secondaryColor="#da2b48"
						>${iconMenu}</sema-button
					>
				</div>
			</nav>

			<main>
				<section class="hero">
					<div class="swiss-grid"></div>
					<div class="hero-content">
						<div class="badge">Version 0.0.1 (beta) Available</div>
						<h1>
							Build Universal Apps with
							<span style="color: var(--primary)">Swiss Precision</span>
						</h1>
						<p>
							The ultimate Web Component library powered by <b>Lit</b>.
							Framework-agnostic, enterprise-ready, and strictly minimalist.
						</p>

						<div class="btn-group">
							<sema-button kind="link" url="/docs" size="full" fontSize="lg">
								Get Started
							</sema-button>
							<sema-button
								mode="outline"
								kind="link"
								url="https://github.com/JEGDevStudios/Sema-UI"
								size="full"
								fontSize="lg"
							>
								GitHub Repository
							</sema-button>
						</div>
					</div>
				</section>

				<section class="features">
					<h2 style="font-size: 2rem; font-weight: 900; margin-bottom: 2rem;">
						Engineered for Performance
					</h2>

					<div class="card">
						<span
							class="material-symbols-outlined"
							style="color: var(--primary); font-size: 32px;"
							>bolt</span
						>
						<h4>Blazing Fast</h4>
						<p style="font-size: 0.875rem; color: #6b7280;">
							Optimized for LCP and minimal TTI. Components render in
							microseconds.
						</p>
					</div>

					<div
						style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;"
					>
						<div class="card" style="margin-bottom: 0;">
							<span
								class="material-symbols-outlined"
								style="color: var(--primary)"
								>refresh</span
							>
							<h4 style="font-size: 0.75rem;">Native Reactivity</h4>
						</div>
						<div
							class="card"
							style="background: var(--primary); color: white; border: none; margin-bottom: 0;"
						>
							<span class="material-symbols-outlined">brush</span>
							<h4 style="font-size: 0.75rem;">100% Custom</h4>
						</div>
					</div>

					<div class="card">
						<span
							class="material-symbols-outlined"
							style="color: var(--primary); font-size: 32px;"
							>code</span
						>
						<h4>Lit + TypeScript</h4>
						<p style="font-size: 0.875rem; color: #6b7280;">
							Built with <b>TypeScript</b> for type safety and <b>Lit</b> for
							standard-based components.
						</p>
					</div>
				</section>

				<section class="faqs">
					<sema-faqs title="Respondemos tus dudas" .faqs=${faqs}></sema-faqs>
				</section>
			</main>

			<footer>
				<h2 class="logo" style="margin-bottom: 1rem;">SEMA UI</h2>
				<p style="color: #9ca3af; font-size: 0.875rem;">
					Swiss-designed building blocks for the modern web.
				</p>
				<ul class="footer-links">
					<li><a href="/docs">Documentation</a></li>
					<li><a href="/components">Components</a></li>
					<li>
						<a href="https://github.com/JEGDevStudios/Sema-UI">GitHub</a>
					</li>
				</ul>
				<div class="footer-copy">
					© ${new Date().getFullYear()} Sema UI. Built with Precision.
				</div>
			</footer>
		`;
	}
}
customElements.define("sema-home", SemaHome);
