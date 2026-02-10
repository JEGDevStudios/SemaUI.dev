import { LitElement, html } from "lit";
import { SemaFooterStyles } from "./sema-footer.css";

export class SemaFooter extends LitElement {
	static styles = [SemaFooterStyles];

	render() {
		return html`
			<footer>
				<h2 class="logo" style="margin-bottom: 1rem;">SEMA UI</h2>
				<p style="color: #9ca3af; font-size: 0.875rem;">
					Construye bloques minimalistas para web modernas.
				</p>
				<ul class="footer-links">
					<li><a href="/docs" title="Ir a la página de documentación" target="_blanck">Documentación</a></li>
					<li><a href="/docs/accordion" title="Ir a la sección de componentes en la documentación" target="_blanck">Componentes</a></li>
					<li>
						<a href="https://github.com/JEGDevStudios/Sema-UI" title="Ir al repositorio de github" target="_blanck"
							>GitHub
							<svg
								xmlns="http://www.w3.org/2000/svg"
								version="1.1"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								width="20"
								height="20"
								x="0"
								y="0"
								viewBox="0 0 512 512"
								style="enable-background:new 0 0 512 512"
								xml:space="preserve"
								class=""
							>
								<g>
									<path
										d="M255.968 5.329C114.624 5.329 0 120.401 0 262.353c0 113.536 73.344 209.856 175.104 243.872 12.8 2.368 17.472-5.568 17.472-12.384 0-6.112-.224-22.272-.352-43.712-71.2 15.52-86.24-34.464-86.24-34.464-11.616-29.696-28.416-37.6-28.416-37.6-23.264-15.936 1.728-15.616 1.728-15.616 25.696 1.824 39.2 26.496 39.2 26.496 22.848 39.264 59.936 27.936 74.528 21.344 2.304-16.608 8.928-27.936 16.256-34.368-56.832-6.496-116.608-28.544-116.608-127.008 0-28.064 9.984-51.008 26.368-68.992-2.656-6.496-11.424-32.64 2.496-68 0 0 21.504-6.912 70.4 26.336 20.416-5.696 42.304-8.544 64.096-8.64 21.728.128 43.648 2.944 64.096 8.672 48.864-33.248 70.336-26.336 70.336-26.336 13.952 35.392 5.184 61.504 2.56 68 16.416 17.984 26.304 40.928 26.304 68.992 0 98.72-59.84 120.448-116.864 126.816 9.184 7.936 17.376 23.616 17.376 47.584 0 34.368-.32 62.08-.32 70.496 0 6.88 4.608 14.88 17.6 12.352C438.72 472.145 512 375.857 512 262.353 512 120.401 397.376 5.329 255.968 5.329z"
										fill="currentColor"
										opacity="1"
										data-original=""
										class=""
									></path>
								</g></svg
						></a>
					</li>
					<li>
						<a href="https://www.npmjs.com/package/@jegdev/semaui/" title="Ir a la página de NPM" target="_blanck">
							NPM

							<svg
								xmlns="http://www.w3.org/2000/svg"
								version="1.1"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								width="20"
								height="20"
								x="0"
								y="0"
								viewBox="0 0 24 24"
								style="enable-background:new 0 0 512 512"
								xml:space="preserve"
								class=""
								style="fill: currentColor"
							>
								<g>
									<linearGradient
										id="a"
										x1="-1.1"
										x2="25.1"
										y1="5.892"
										y2="18.108"
										gradientUnits="userSpaceOnUse"
									>
										<stop offset="0" stop-color="#fff" stop-opacity=".2"></stop>
										<stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
									</linearGradient>
									<rect
										width="22"
										height="22"
										x="1"
										y="1"
										rx=".5"
										fill="#6b7280"
										opacity="1"
										data-original="#000000"
										class=""
										style="fill: currentColor"
									></rect>
									<path
										fill="#6b7280"
										d="M2 2h20v20H2z"
										opacity="1"
										data-original="#f44336"
										class=""
										style="fill: currentColor"
									></path>
									<path
										d="M18.5 19h-3a.5.5 0 0 1-.5-.5V9h-2v9.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5z"
										fill="#6b7280"
										opacity="1"
										data-original="#000000"
										class=""
									></path>
									<path
										fill=""
										d="M16 18h2V6H6v12h6V8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5z"
										opacity="1"
										data-original=""
										class=""
									></path>
									<rect
										width="22"
										height="22"
										x="1"
										y="1"
										fill="url(#a)"
										rx=".5"
										opacity="1"
										data-original="url(#a)"
										class=""
									></rect>
								</g>
							</svg>
						</a>
					</li>
				</ul>
				<div class="footer-copy">
					By
					<a
						href="https://www.jegdevstudios.com"
						title="Echo por JEG Dev Studios"
						>JEG Dev Studios</a
					>
					© ${new Date().getFullYear()} Sema UI. Construye con precision.
				</div>
			</footer>
		`;
	}
}
customElements.define("sema-footer", SemaFooter);
