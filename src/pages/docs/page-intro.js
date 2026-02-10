import { LitElement, html, css } from "lit";

export class SemaIntro extends LitElement {
	static properties = {
		theme: { type: String, reflect: true },
	};

	static styles = css`
		:host {
			--primary: #da2b48;
			--bg-light: #f3f4f6;
			--bg-dark: #121212;
			--text-main: #171212;
			--border-color: #e5e7eb;
			--swiss-gray: #f3f4f6;
			display: block;
			color: var(--text-main);
			line-height: 1.6;
			font-family: "Inter", sans-serif;
		}

		:host([theme="dark"]) {
			--bg-light: #121212;
			--text-main: #ffffff;
			--border-color: #333;
			--swiss-gray: #111;
		}

		.header {
			margin-bottom: 4rem;
			border-bottom: 1px solid var(--border-color);
			padding-bottom: 2rem;
		}

		.badge {
			display: inline-block;
			background: var(--text-main);
			color: var(--bg-light);
			font-size: 10px;
			font-weight: 900;
			padding: 4px 8px;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			margin-bottom: 1rem;
		}

		h1 {
			font-size: clamp(2.5rem, 5vw, 4rem);
			font-weight: 900;
			letter-spacing: -0.04em;
			margin: 0;
			line-height: 1.1;
		}

		.lead {
			font-size: 1.25rem;
			color: var(--text-main);
			opacity: 0.8;
			margin-top: 1.5rem;
			max-width: 600px;
		}

		section {
			margin-bottom: 3rem;
		}

		h2 {
			font-size: 1.5rem;
			font-weight: 800;
			letter-spacing: -0.02em;
			margin-bottom: 1.5rem;
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		h2::after {
			content: "";
			flex: 1;
			height: 1px;
			background: var(--border-color);
		}

		p {
			margin-bottom: 1.5rem;
			max-width: 70ch;
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 2rem;
			margin-top: 3rem;
		}

		.card {
			padding: 1.5rem;
			border: 1px solid var(--border-color);
			border-radius: 4px;
			transition: border-color 0.2s ease;
		}

		.card:hover {
			border-color: #da2b48;
		}

		.card h3 {
			font-size: 1.1rem;
			font-weight: 700;
			margin: 0 0 0.5rem 0;
		}

		.card p {
			font-size: 0.9rem;
			color: var(--text-main);
			opacity: 0.7;
			margin: 0;
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

	render() {
		return html`
			<div class="header">
				<span class="badge">Docs / Concept</span>
				<h1>Introducción</h1>
				<p class="lead">
					Sema UI es una librería de componentes de interfaz de usuario de alto
					rendimiento, construida con Lit y TypeScript, inspirada en el diseño
					minimalista.
				</p>
			</div>

			<section>
				<h2>Filosofía</h2>
				<p>
					Sema UI no es solo una colección de botones y formularios. Es un
					sistema diseñado bajo los principios del Estilo Tipográfico
					Internacional: legibilidad, objetividad y el uso de rejillas
					matemáticas.
				</p>
				<p>
					Nuestro objetivo es proporcionar a los desarrolladores herramientas
					que permitan construir aplicaciones web modernas, rápidas y
					estéticamente impecables sin la sobrecarga de frameworks pesados.
				</p>
			</section>

			<div class="grid">
				<sema-card-feature>
					<span slot="title">Nativo y Rápido</span>
					<p>
						Construido sobre Web Components estándar. Sin virtual DOM, solo la
						velocidad de la plataforma web.
					</p>
				</sema-card-feature>
				<sema-card-feature>
					<span slot="title">Tipografía Primero</span>
					<p>
						Jerarquías claras y uso de fuentes sans-serif para una legibilidad
						máxima en pantallas.
					</p>
				</sema-card-feature>
				<sema-card-feature>
					<span slot="title">Ecosistema Lit</span>
					<p>
						Aprovecha toda la potencia de Lit para el manejo de estados y
						propiedades reactivas.
					</p>
				</sema-card-feature>
			</div>
		`;
	}
}
customElements.define("page-intro", SemaIntro);
