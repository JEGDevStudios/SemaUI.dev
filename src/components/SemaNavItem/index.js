import { LitElement, html, css } from 'lit';

export class SemaNavItem extends LitElement {
  static properties = {
    href: { type: String },
    active: { type: Boolean, reflect: true },
    indent: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      --nav-item-color: #666;
      --nav-item-active-color: #000;
      --nav-item-bg-active: #f3f4f6;
    }

    a {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      text-decoration: none;
      color: var(--nav-item-color);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      border-radius: 4px;
      transition: all 0.2s ease;
      border-left: 2px solid transparent;
    }

    :host([indent]) a {
      padding-left: 24px;
    }

    a:hover {
      background-color: var(--nav-item-bg-active);
      color: var(--nav-item-active-color);
    }

    :host([active]) a {
      color: var(--nav-item-active-color);
      font-weight: 700;
      background-color: var(--nav-item-bg-active);
      border-left: 2px solid #da2b48; /* El rojo característico de Sema */
    }
  `;

  // Dentro de la clase SemaNavItem en sema-nav-item.js
  connectedCallback() {
    super.connectedCallback();
    this._checkActive();
    // Escuchar cambios en la URL
    window.addEventListener('vaadin-router-location-changed', () => this._checkActive());
  }

  _checkActive() {
    // Compara la URL actual con el href del componente
    const currentPath = window.location.pathname;
    this.active = currentPath === this.href;
  }
  
  render() {
    return html`
      <a href="${this.href}">
        <slot></slot>
      </a>
    `;
  }
}
customElements.define('sema-nav-item', SemaNavItem);