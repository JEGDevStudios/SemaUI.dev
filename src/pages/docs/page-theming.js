import { LitElement, html, css } from "lit";

export class SemaThemingPage extends LitElement {
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

	render() {
		return html`
			<div class="header">
				<span class="badge">Docs / Theming</span>
				<h1>Dark Mode</h1>
				<p class="lead">
					Sema UI soporta modo oscuro de forma nativa. Aprende cómo implementar
					el cambio de tema en tu aplicación.
				</p>
			</div>

			<section>
				<h2>Cómo funciona</h2>
				<p>
					Todos los componentes de Sema UI escuchan cambios en el atributo
					<code>data-theme</code> de la etiqueta <code>&lt;html&gt;</code>. Si
					el valor es <code>"dark"</code>, los componentes cambiarán sus
					variables CSS internas automáticamente.
				</p>
				<sema-code-snippet
					>&lt;html data-theme="dark"&gt; ... &lt;/html&gt;</sema-code-snippet
				>
			</section>

			<section>
				<h2>Implementación</h2>

				<h3>Vanilla JS</h3>
				<p>Puedes crear una función simple para alternar el atributo.</p>
				<sema-code-snippet>
					const toggleTheme = () => { const html = document.documentElement;
					const current = html.getAttribute("data-theme"); const next = current
					=== "dark" ? "light" : "dark"; html.setAttribute("data-theme", next);
					localStorage.setItem("theme", next); };
				</sema-code-snippet>

				<h3>React</h3>
				<p>
					Un hook personalizado es la mejor opción para manejar el tema en
					React.
				</p>
				<sema-code-snippet>
					import { useEffect, useState } from 'react'; export function
					useTheme() { const [theme, setTheme] = useState('light'); useEffect(()
					=> { const saved = localStorage.getItem('theme'); const prefersDark =
					window.matchMedia('(prefers-color-scheme: dark)').matches; const
					initial = saved || (prefersDark ? 'dark' : 'light');
					setTheme(initial); document.documentElement.setAttribute('data-theme',
					initial); }, []); const toggleTheme = () => { const next = theme ===
					'dark' ? 'light' : 'dark'; setTheme(next);
					document.documentElement.setAttribute('data-theme', next);
					localStorage.setItem('theme', next); }; return { theme, toggleTheme };
					}
				</sema-code-snippet>

				<h3>Vue 3</h3>
				<p>Usando Composition API.</p>
				<sema-code-snippet>
					import { ref, onMounted } from 'vue'; export function useTheme() {
					const theme = ref('light'); onMounted(() => { const saved =
					localStorage.getItem('theme'); const prefersDark =
					window.matchMedia('(prefers-color-scheme: dark)').matches; const
					initial = saved || (prefersDark ? 'dark' : 'light'); theme.value =
					initial; document.documentElement.setAttribute('data-theme', initial);
					}); const toggleTheme = () => { const next = theme.value === 'dark' ?
					'light' : 'dark'; theme.value = next;
					document.documentElement.setAttribute('data-theme', next);
					localStorage.setItem('theme', next); }; return { theme, toggleTheme };
					}
				</sema-code-snippet>

				<h3>Astro</h3>
				<p>
					Para evitar el "flash" de contenido incorrecto (FOUC), añade este
					script en línea dentro del <code>&lt;head&gt;</code> de tu Layout
					principal.
				</p>
				<sema-code-snippet>
					&lt;script is:inline&gt; const theme = (() => { if (typeof
					localStorage !== 'undefined' && localStorage.getItem('theme')) {
					return localStorage.getItem('theme'); } if
					(window.matchMedia('(prefers-color-scheme: dark)').matches) { return
					'dark'; } return 'light'; })(); if (theme === 'light') {
					document.documentElement.setAttribute('data-theme', 'light'); } else {
					document.documentElement.setAttribute('data-theme', 'dark'); }
					window.localStorage.setItem('theme', theme); &lt;/script&gt;
				</sema-code-snippet>
			</section>
		`;
	}
}
customElements.define("page-theming", SemaThemingPage);
