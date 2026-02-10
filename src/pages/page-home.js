import { LitElement, html, css } from "lit";
import "@jegdev/semaui";

export class PageHome extends LitElement {
	static properties = {
		theme: { type: String, reflect: true },
	};

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

		/* Faqs*/
		.faqs {
			padding: 0 1.5rem 4rem;
			background: var(--swiss-gray);
		}

		@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined");
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

	render() {
		const faqs = [
			{
				question: "¿Qué es Sema UI?",
				answer:
					"Sema UI es una librería de Web Components ligera y agnóstica al framework construida con Lit. Se enfoca en el rendimiento y el minimalismo.",
			},
			{
				question: "¿Por qué Lit?",
				answer:
					"Lit proporciona una capa delgada sobre los Web Components estándar, asegurando un rendimiento extremadamente rápido y compatibilidad a futuro sin la sobrecarga de frameworks más grandes.",
			},
			{
				question: "¿Puedo usarlo con React o Vue?",
				answer:
					"¡Sí! Dado que Sema UI está construido sobre estándares web, funciona perfectamente con cualquier framework (React, Vue, Angular, Svelte) o con JavaScript puro.",
			},
		];

		return html`
			<section class="hero">
				<div class="swiss-grid"></div>
				<div class="hero-content">
					<div class="badge">Versión 0.0.1 Disponible</div>
					<h1>
						Construye Apps Universales con
						<span style="color: var(--primary)">Precisión</span>
					</h1>
					<p>
						La librería definitiva de Web Components impulsada por <b>Lit</b>.
						Agnóstica al framework, lista para empresas y estrictamente
						minimalista.
					</p>

					<div class="btn-group">
						<sema-button kind="link" url="/docs" size="full" fontSize="lg">
							Comenzar
						</sema-button>
						<sema-button
							mode="outline"
							kind="link"
							url="https://github.com/JEGDevStudios/Sema-UI"
							size="full"
							fontSize="lg"
						>
							Repositorio GitHub
						</sema-button>
					</div>
				</div>
			</section>

			<section class="features">
				<h2 style="font-size: 2rem; font-weight: 900; margin-bottom: 2rem;">
					Diseñado para el Rendimiento
				</h2>

				<sema-card-info labelFontSize="32px" style="margin-bottom: 1rem;">
					<span slot="label" class="material-symbols-outlined">bolt</span>
					<span slot="title">Extremadamente Rápido</span>
					<p>
						Optimizado para LCP y TTI mínimo. Los componentes se renderizan en
						microsegundos.
					</p>
				</sema-card-info>

				<div
					style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;"
				>
					<sema-card-info size="sm">
						<span slot="label" class="material-symbols-outlined">refresh</span>
						<span slot="title">Reactividad Nativa</span>
					</sema-card-info>

					<sema-card-info size="sm" filled>
						<span slot="label" class="material-symbols-outlined">brush</span>
						<span slot="title">100%</span>
						<p>
							 Personalizable
						</p>
					</sema-card-info>
				</div>

				<sema-card-info labelFontSize="32px">
					<span slot="label" class="material-symbols-outlined">code</span>
					<span slot="title">Lit + TypeScript</span>
					<p>
						Construido con <b>TypeScript</b> para seguridad de tipos y
						<b>Lit</b> para componentes basados en estándares.
					</p>
				</sema-card-info>
			</section>

			<section class="faqs">
				<sema-faqs title="Respondemos tus dudas" .faqs=${faqs}></sema-faqs>
			</section>
		`;
	}
}
customElements.define("page-home", PageHome);
