import { LitElement, html, css } from "lit";

export class SemaInputPage extends LitElement {
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
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-width: 400px;
		}
	`;

	constructor() {
		super();
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
				<span class="badge">Components / Input</span>
				<h1>Sema Input</h1>
				<p class="lead">
					El componente <code>&lt;sema-input&gt;</code> es un campo de entrada
					de texto versátil con soporte para etiquetas, placeholders,
					validaciones y diferentes estados visuales.
				</p>
			</div>

			<section>
				<h2>Instalación</h2>
				<p>Asegúrate de importar el componente en tu proyecto.</p>

				<h3>React / Next.js</h3>
				<sema-code-snippet
					>import "@jegdev/semaui"; export default function App() { return (
					&lt;div&gt; &lt;sema-input label="Nombre" placeholder="Escribe tu
					nombre"&gt;&lt;/sema-input&gt; &lt;/div&gt; ); }</sema-code-snippet
				>

				<h3>Vue</h3>
				<sema-code-snippet
					>&lt;script setup&gt; import "@jegdev/semaui"; &lt;/script&gt;
					&lt;template&gt; &lt;sema-input label="Email"
					type="email"&gt;&lt;/sema-input&gt;
					&lt;/template&gt;</sema-code-snippet
				>

				<h3>HTML / Astro / Svelte</h3>
				<sema-code-snippet
					>&lt;sema-input
					label="Usuario"&gt;&lt;/sema-input&gt;</sema-code-snippet
				>
			</section>

			<section>
				<h2>Ejemplos de Uso</h2>

				<h3>1. Input Básico</h3>
				<p>Un campo de texto simple con placeholder.</p>
				<div class="preview">
					<sema-input placeholder="Escribe algo..."></sema-input>
				</div>
				<sema-code-snippet
					>&lt;sema-input placeholder="Escribe
					algo..."&gt;&lt;/sema-input&gt;</sema-code-snippet
				>

				<h3>2. Con Etiqueta (Label)</h3>
				<p>
					Agrega una etiqueta descriptiva usando la propiedad
					<code>label</code>.
				</p>
				<div class="preview">
					<sema-input
						label="Nombre Completo"
						placeholder="Juan Pérez"
					></sema-input>
				</div>
				<sema-code-snippet
					>&lt;sema-input label="Nombre Completo" placeholder="Juan
					Pérez"&gt;&lt;/sema-input&gt;</sema-code-snippet
				>

				<h3>3. Tipos de Input</h3>
				<p>
					Soporta diferentes tipos como <code>password</code>,
					<code>email</code>, <code>number</code>, etc.
				</p>
				<div class="preview">
					<sema-input
						type="password"
						label="Contraseña"
						placeholder="••••••••"
					></sema-input>
					<sema-input
						type="email"
						label="Correo Electrónico"
						placeholder="usuario@ejemplo.com"
					></sema-input>
				</div>
				<sema-code-snippet
					>&lt;sema-input type="password"
					label="Contraseña"&gt;&lt;/sema-input&gt; &lt;sema-input type="email"
					label="Correo Electrónico"&gt;&lt;/sema-input&gt;</sema-code-snippet
				>

				<h3>4. Estados</h3>
				<p>Puedes deshabilitar el input o mostrar un estado de error.</p>
				<div class="preview">
					<sema-input
						label="Deshabilitado"
						disabled
						value="No puedes editar esto"
					></sema-input>
					<sema-input
						label="Con Error"
						error="El formato no es válido"
					></sema-input>
				</div>
				<sema-code-snippet
					>&lt;sema-input disabled value="No puedes editar
					esto"&gt;&lt;/sema-input&gt; &lt;sema-input error="El formato no es
					válido"&gt;&lt;/sema-input&gt;</sema-code-snippet
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
							<td><code>text</code></td>
							<td>Tipo de input (text, password, email, number, etc).</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Texto de la etiqueta superior.</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Texto de ayuda dentro del campo.</td>
						</tr>
						<tr>
							<td><code>value</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Valor del input.</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>Boolean</code></td>
							<td><code>false</code></td>
							<td>Deshabilita la interacción con el campo.</td>
						</tr>
						<tr>
							<td><code>error</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Mensaje de error a mostrar debajo del input.</td>
						</tr>
					</tbody>
				</table>
			</section>
		`;
	}
}
customElements.define("page-input", SemaInputPage);
