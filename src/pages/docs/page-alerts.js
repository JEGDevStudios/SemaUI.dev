import { LitElement, html, css } from "lit";

export class SemaAlertsPage extends LitElement {
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

		h3 {
			font-size: 1.2rem;
			font-weight: 700;
			margin-top: 2rem;
			margin-bottom: 1rem;
		}

		p {
			margin-bottom: 1.5rem;
			max-width: 70ch;
		}

		code {
			font-family: inherit;
			background: var(--swiss-gray);
			padding: 0.2em 0.4em;
			border-radius: 4px;
		}

		/* Table Styles */
		table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 1rem;
			font-size: 0.9rem;
		}

		th {
			text-align: left;
			padding: 1rem;
			border-bottom: 2px solid var(--border-color);
			font-weight: 700;
		}

		td {
			padding: 1rem;
			border-bottom: 1px solid var(--border-color);
			vertical-align: top;
		}

		.preview {
			padding: 2rem;
			border: 1px solid var(--border-color);
			border-radius: 8px;
			margin-bottom: 1.5rem;
			background: var(--bg-light);
		}
	`;
	constructor() {
		super();
		// Sincronizar con el estado global o localStorage al iniciar
		this.theme =
			localStorage.getItem("theme") ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light");
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
				<span class="badge">Components / Alerts</span>
				<h1>Sema Alerts</h1>
				<p class="lead">
					El componente <code>&lt;sema-alerts&gt;</code> es un elemento de
					interfaz versátil que permite renderizar mensajes para el usuario ya
					sea dentro de una web o una PWA con estilos consistentes, y soporte
					para dark mode nativo y autónomo.
				</p>
			</div>

			<section>
				<h2>Instalación</h2>
				<p>
					Asegúrate de importar el componente en tu proyecto. Aquí tienes
					ejemplos para los frameworks más populares:
				</p>

				<h3>React / Next.js</h3>
				<p>
					Importa la librería en tu archivo principal (<code>main.jsx</code>,
					<code>App.jsx</code>) o en el <code>layout.tsx</code>.
				</p>
				<sema-code-snippet
					>import "@jegdev/semaui"; export default function App() { return (
					&lt;div&gt; &lt;sema-alerts title="Información" message="Este es un
					mensaje informativo." &gt;&lt;/sema-alerts&gt; &lt;/div&gt; );
					}</sema-code-snippet
				>
				<p>
					Nota para Next.js: Si usas App Router, importa el componente en un
					Client Component o en el layout.tsx (usando 'use client' si es
					necesario).
				</p>

				<h3>Vue</h3>
				<p>
					Configura Vite (o tu bundler) para tratar las etiquetas sema- como
					elementos personalizados y evitar advertencias de compilación.
				</p>
				<sema-code-snippet
					>// vite.config.js export default defineConfig({ plugins: [ vue({
					template: { compilerOptions: { isCustomElement: (tag) =>
					tag.startsWith("sema-"), }, }, }), ], });</sema-code-snippet
				>

				<h3>Angular</h3>
				<p>
					Agrega CUSTOM_ELEMENTS_SCHEMA en tu módulo para permitir el uso de Web
					Components.
				</p>
				<sema-code-snippet
					>import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
					import "@jegdev/semaui"; @NgModule({ schemas:
					[CUSTOM_ELEMENTS_SCHEMA], }) export class AppModule
					{}</sema-code-snippet
				>

				<h3>Astro / Svelte</h3>
				<sema-code-snippet>import "@jegdev/semaui";</sema-code-snippet>
			</section>

			<section>
				<h2>Ejemplos de Uso</h2>

				<h3>1. Mensaje básico (Info)</h3>
				<p>
					Por defecto, el componente renderiza un mensaje de tipo informativo
					para el usuario (type="info") con los estilos en verde.
				</p>
				<div class="preview">
					<sema-alerts
						title="Información"
						message="Este es un mensaje informativo."
					></sema-alerts>
				</div>
				<sema-code-snippet
					>&lt;sema-alerts title="Información" message="Este es un mensaje
					informativo."&gt;&lt;/sema-alerts&gt;</sema-code-snippet
				>

				<h3>2. Type Warn</h3>
				<p>
					Para que el componente de mensaje informativo funcione como uno de
					tipo alerta (type="warn"), define la propiedad
					<code>type="warn"</code>.
				</p>
				<div class="preview">
					<sema-alerts
						type="warn"
						title="Alerta"
						message="Este es un mensaje de advertencia."
					></sema-alerts>
				</div>
				<sema-code-snippet
					>&lt;sema-alerts type="warn" title="Alerta" message="Este es un
					mensaje de advertencia." &gt;&lt;/sema-alerts&gt;</sema-code-snippet
				>

				<h3>3. Type Error</h3>
				<p>
					Para que el componente de mensaje funcione como uno de tipo error
					(type="error"), define la propiedad <code>type="error"</code>.
				</p>
				<div class="preview">
					<sema-alerts
						type="error"
						title="Error"
						message="Este es un mensaje de error"
					></sema-alerts>
				</div>
				<sema-code-snippet
					>&lt;sema-alerts type="error" title="Error" message="Este es un
					mensaje de error" &gt;&lt;/sema-alerts&gt;</sema-code-snippet
				>
			</section>

			<section>
				<h2>API Reference</h2>
				<table>
					<thead>
						<tr>
							<th>Propiedad</th>
							<th>Tipo</th>
							<th>Default</th>
							<th>Descripción</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>type</code></td>
							<td><code>String</code></td>
							<td><code>info</code></td>
							<td>
								Puedes alternar entre <code>warn</code> y <code>error</code>
							</td>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Puedes pasarle aqui el titulo del mensaje.</td>
						</tr>
						<tr>
							<td><code>message</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Pueder pasarle aqui el texto (párrafo) del mensaje.</td>
						</tr>
					</tbody>
				</table>
			</section>
		`;
	}
}
customElements.define("page-alerts", SemaAlertsPage);
