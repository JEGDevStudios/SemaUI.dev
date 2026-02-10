import { LitElement, html, css } from "lit";

export class SemaButtonPage extends LitElement {
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
			gap: 1rem;
			flex-wrap: wrap;
			align-items: center;
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
				<span class="badge">Components / Button</span>
				<h1>Sema Button</h1>
				<p class="lead">
					El componente <code>&lt;sema-button&gt;</code> es un elemento de
					interfaz versátil que permite renderizar botones de acción o enlaces
					de navegación con estilos consistentes, tamaños configurables y
					soporte para personalización de colores.
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
					&lt;div&gt; &lt;sema-button&gt;Click en React&lt;/sema-button&gt;
					&lt;/div&gt; ); }</sema-code-snippet
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

				<h3>Astro</h3>
				<sema-code-snippet>import "@jegdev/semaui";</sema-code-snippet>
				<sema-code-snippet
					>&lt;sema-button&gt;Hola Astro&lt;/sema-button&gt;</sema-code-snippet
				>

				<h3>Svelte</h3>
				<sema-code-snippet>import "@jegdev/semaui";</sema-code-snippet>
			</section>

			<section>
				<h2>Ejemplos de Uso</h2>

				<h3>1. Botón Básico</h3>
				<p>
					Por defecto, el componente renderiza un botón con los estilos
					primarios de la marca (rojo).
				</p>
				<div class="preview">
					<sema-button>Click Aquí</sema-button>
				</div>
				<sema-code-snippet
					>&lt;sema-button&gt;Click Aquí&lt;/sema-button&gt;</sema-code-snippet
				>

				<h3>2. Enlace de Navegación</h3>
				<p>
					Para que el botón funcione como un hipervínculo
					(<code>&lt;a&gt;</code>), define la propiedad
					<code>kind="link"</code> y proporciona una <code>url</code>.
				</p>
				<div class="preview">
					<sema-button kind="link" url="https://google.com" target="_blank"
						>Ir a Google</sema-button
					>
				</div>
				<sema-code-snippet
					>&lt;sema-button kind="link" url="https://google.com"
					target="_blank"&gt; Ir a Google
					&lt;/sema-button&gt;</sema-code-snippet
				>

				<h3>3. Tamaños (Size)</h3>
				<p>
					Controla el ancho del botón mediante la propiedad <code>size</code>.
				</p>
				<ul>
					<li><strong>sm</strong>: 80px</li>
					<li><strong>md</strong>: 120px (Por defecto)</li>
					<li><strong>lg</strong>: 160px</li>
					<li><strong>full</strong>: 100% del contenedor padre</li>
				</ul>
				<div class="preview">
					<sema-button size="sm">Small</sema-button>
					<sema-button size="md">Medium</sema-button>
					<sema-button size="lg">Large</sema-button>
				</div>
				<div class="preview">
					<sema-button size="full">Full Width</sema-button>
				</div>
				<sema-code-snippet
					>&lt;!-- Botón pequeño --&gt; &lt;sema-button
					size="sm"&gt;Small&lt;/sema-button&gt; &lt;!-- Botón ancho completo
					--&gt; &lt;sema-button size="full"&gt;Full
					Width&lt;/sema-button&gt;</sema-code-snippet
				>

				<h3>4. Tamaño de Fuente (Font Size)</h3>
				<p>
					Puedes ajustar el tamaño del texto independientemente del tamaño del
					botón usando <code>fontSize</code>.
				</p>
				<div class="preview">
					<sema-button fontSize="xl">Texto Grande</sema-button>
				</div>
				<sema-code-snippet
					>&lt;sema-button fontSize="xl"&gt;Texto
					Grande&lt;/sema-button&gt;</sema-code-snippet
				>

				<h3>5. Colores Personalizados</h3>
				<p>
					Para aplicar tus propios colores, añade el atributo
					<code>custom</code> (booleano) y define los colores de fondo y texto.
				</p>
				<p>
					<strong>Nota:</strong> Al hacer hover, los colores se invierten
					automáticamente para crear un efecto visual.
				</p>
				<div class="preview">
					<sema-button custom="on" firstColor="#000000" secondaryColor="#FACC15"
						>Negro y Amarillo</sema-button
					>
				</div>
				<sema-code-snippet
					>&lt;sema-button custom="on" firstColor="#000000"
					secondaryColor="#FACC15"&gt; Negro y Amarillo
					&lt;/sema-button&gt;</sema-code-snippet
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
							<td><code>mode</code></td>
							<td><code>String</code></td>
							<td><code>primary</code></td>
							<td>
								Puedes alternar entre <code>outline</code> y <code>ghost</code>
							</td>
						</tr>
						<tr>
							<td><code>kind</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>
								Si es <code>"link"</code>, renderiza un <code>&lt;a&gt;</code>.
								De lo contrario, un <code>&lt;button&gt;</code>.
							</td>
						</tr>
						<tr>
							<td><code>url</code></td>
							<td><code>String</code></td>
							<td><code>undefined</code></td>
							<td>
								URL de destino. Solo funciona si <code>kind="link"</code>.
							</td>
						</tr>
						<tr>
							<td><code>target</code></td>
							<td><code>String</code></td>
							<td><code>_self</code></td>
							<td>
								Define dónde abrir el enlace (ej. <code>_blank</code>). Solo si
								<code>kind="link"</code>.
							</td>
						</tr>
						<tr>
							<td><code>altText</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>
								Define los texts de los atributos <code>alt</code> y
								<code>title</code> de un enlace o botón.
							</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>String</code></td>
							<td><code>"md"</code></td>
							<td>
								Ancho del botón: <code>sm</code>, <code>md</code>,
								<code>lg</code>, <code>full</code>.
							</td>
						</tr>
						<tr>
							<td><code>fontSize</code></td>
							<td><code>String</code></td>
							<td><code>"md"</code></td>
							<td>
								Tamaño del texto: <code>sm</code>, <code>md</code>,
								<code>lg</code>, <code>xl</code>.
							</td>
						</tr>
						<tr>
							<td><code>custom</code></td>
							<td><code>String</code></td>
							<td><code>off</code></td>
							<td>
								Activa el modo de colores personalizados con <code>on</code>.
							</td>
						</tr>
						<tr>
							<td><code>firstColor</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Color de fondo (Background) en modo personalizado.</td>
						</tr>
						<tr>
							<td><code>secondaryColor</code></td>
							<td><code>String</code></td>
							<td><code>""</code></td>
							<td>Color de texto en modo personalizado.</td>
						</tr>
					</tbody>
				</table>
			</section>

			<section>
				<h2>Accesibilidad</h2>
				<ul>
					<li>
						El componente utiliza etiquetas semánticas nativas (<code
							>&lt;button&gt;</code
						>
						o <code>&lt;a&gt;</code>) según el caso.
					</li>
					<li>
						Soporta navegación por teclado (<code>Tab</code>) y foco visible
						(<code>outline</code>).
					</li>
					<li>
						El atributo <code>title</code> se establece automáticamente igual
						que <code>alt</code> para mejorar el contexto.
					</li>
				</ul>
			</section>
		`;
	}
}
customElements.define("page-button", SemaButtonPage);
