import { LitElement, html, css } from "lit";

export class SemaCardFeaturePage extends LitElement {
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
				<span class="badge">Components / Card Feature</span>
				<h1>Sema Card Feature</h1>
				<p class="lead">
					El componente <code>&lt;sema-card-feature&gt;</code> permite destacar
					características, servicios o beneficios con un icono, título y
					descripción, soportando personalización de colores.
				</p>
			</div>

			<section>
				<h2>Instalación</h2>
				<p>Asegúrate de importar el componente en tu proyecto.</p>
				<sema-code-snippet>import "@jegdev/semaui";</sema-code-snippet>
			</section>

			<section>
				<h2>Ejemplos de Uso</h2>

				<h3>1. Básico</h3>
				<p>Uso básico con slots para icono, título y contenido.</p>
				<div class="preview">
					<sema-card-feature>
						<span slot="icon">★</span>
						<span slot="title">Destacado</span>
						<p>Este es un ejemplo de una característica destacada.</p>
					</sema-card-feature>
				</div>
				<sema-code-snippet
					>&lt;sema-card-feature&gt; &lt;span slot="icon"&gt;★&lt;/span&gt;
					&lt;span slot="title"&gt;Destacado&lt;/span&gt; &lt;p&gt;Este es un
					ejemplo de una característica destacada.&lt;/p&gt;
					&lt;/sema-card-feature&gt;</sema-code-snippet
				>

				<h3>2. Color Personalizado</h3>
				<p>
					Puedes cambiar el color de acento usando la propiedad
					<code>color</code>.
				</p>
				<div class="preview">
					<sema-card-feature color="#0077ff">
						<span slot="icon">⚡</span>
						<span slot="title">Rápido</span>
						<p>Velocidad increíble con colores personalizados.</p>
					</sema-card-feature>
				</div>
				<sema-code-snippet
					>&lt;sema-card-feature color="#0077ff"&gt; &lt;span
					slot="icon"&gt;⚡&lt;/span&gt; &lt;span
					slot="title"&gt;Rápido&lt;/span&gt; &lt;p&gt;Velocidad increíble con
					colores personalizados.&lt;/p&gt;
					&lt;/sema-card-feature&gt;</sema-code-snippet
				>

				<h3>3. Sin Icono</h3>
				<p>
					El icono es opcional. Si no se proporciona el slot <code>icon</code>, el
					espacio se ajusta automáticamente.
				</p>
				<div class="preview">
					<sema-card-feature>
						<span slot="title">Solo Texto</span>
						<p>Esta tarjeta no tiene icono y se ve genial.</p>
					</sema-card-feature>
				</div>
				<sema-code-snippet
					>&lt;sema-card-feature&gt; &lt;span slot="title"&gt;Solo
					Texto&lt;/span&gt; &lt;p&gt;Esta tarjeta no tiene icono y se ve
					genial.&lt;/p&gt; &lt;/sema-card-feature&gt;</sema-code-snippet
				>

				<h3>4. Alineación</h3>
				<p>
					Controla la alineación del contenido con la propiedad <code>align</code> (left, center, right).
				</p>
				<div class="preview">
					<sema-card-feature align="center">
						<span slot="title">Centrado</span>
						<p>Contenido alineado al centro.</p>
					</sema-card-feature>
				</div>
				<sema-code-snippet
					>&lt;sema-card-feature align="center"&gt;
          &lt;span slot="title"&gt;Centrado&lt;/span&gt; &lt;p&gt;Contenido alineado al
					centro.&lt;/p&gt; &lt;/sema-card-feature&gt;</sema-code-snippet
				>

				<h3>5. Efecto Hover</h3>
				<p>
					Puedes desactivar el efecto de borde al pasar el mouse estableciendo <code>hover="off"</code>.
				</p>
				<div class="preview">
					<sema-card-feature hover="off">
						<span slot="title">Sin Hover</span>
						<p>Esta tarjeta no cambia de color al pasar el mouse.</p>
					</sema-card-feature>
				</div>
				<sema-code-snippet
					>&lt;sema-card-feature hover="off"&gt; &lt;span
					slot="title"&gt;Sin Hover&lt;/span&gt; &lt;p&gt;Esta tarjeta no cambia
					de color al pasar el mouse.&lt;/p&gt;
					&lt;/sema-card-feature&gt;</sema-code-snippet
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
							<td><code>color</code></td>
							<td><code>String</code></td>
							<td><code>undefined</code></td>
							<td>Color de acento para el borde al hacer hover y el icono.</td>
						</tr>
						<tr>
							<td><code>align</code></td>
							<td><code>String</code></td>
							<td><code>left</code></td>
							<td>Alineación del contenido: <code>left</code>, <code>center</code>, <code>right</code>.</td>
						</tr>
						<tr>
							<td><code>hover</code></td>
							<td><code>String</code></td>
							<td><code>on</code></td>
							<td>Controla el efecto visual al pasar el mouse: <code>on</code>, <code>off</code>.</td>
						</tr>
					</tbody>
				</table>
				<h3 style="margin-top: 2rem;">Slots</h3>
				<table>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Descripción</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>icon</code></td>
							<td>El icono o elemento visual principal.</td>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td>El título de la tarjeta.</td>
						</tr>
						<tr>
							<td><code>(default)</code></td>
							<td>El contenido o descripción de la tarjeta.</td>
						</tr>
					</tbody>
				</table>
			</section>
		`;
	}
}
customElements.define("page-card-feature", SemaCardFeaturePage);
