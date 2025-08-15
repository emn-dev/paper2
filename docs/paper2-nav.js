"use strict";

(function () {
  const sharedStyles = new CSSStyleSheet();
  sharedStyles.replaceSync(`
      nav {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        background: #333;
        color: white;
        padding: 0.5rem 1rem;
      }

      /* Hide the checkbox */
      #menu-toggle {
        display: none;
      }

      /* Hamburger icon */
      .menu-icon {
        display: none;
        cursor: pointer;
        font-size: 2rem;
      }

      .nav-links {
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;
        justify-content: center;
      }

      .nav-links a {
        color: white;
        text-decoration: none;
      }

      .nav-links a:hover {
        text-decoration: underline;
      }

      .login {
        text-align: right;
      }

      /* Responsive styles */
      @media (max-width: 768px) {
        nav {
          grid-template-columns: auto auto auto;
        }

        .menu-icon {
          display: block;
        }

        .nav-links {
          display: none;
          grid-auto-flow: row;
          gap: 0;
          background: #444;
          grid-column: 1 / -1;
          padding: 0.5rem;
        }

        .nav-links a {
          margin: 0.5rem;
        }

        /* Show menu when checkbox is checked */
        #menu-toggle:checked + .menu-icon + .nav-links {
          display: grid;
        }
      }
  `);

  class Paper2Nav extends HTMLElement {
    constructor() {
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      shadow.adoptedStyleSheets = [sharedStyles];
      const ele = document.createElement("nav");
      ele.innerHTML = `          
          <input type="checkbox" id="menu-toggle">
          <label for="menu-toggle" class="menu-icon">&#9776;</label>
          
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="straps.html">Straps</a>
            <a href="simple.html">Simple</a>
            <a href="booleanOps.html">Boolean Ops</a>
            <a href="chain.html">Chain</a>
            <a href="exportCircle.html">Export Circle</a>
            <a href="drippingBrush.html">Dripping Brush</a>
            <a href="importViewbox.html">Import Viewbox 1</a>
            <a href="rasterSpiral.html">Spiral Raster</a>
            <a href="animatedStar.html">Animated Star</a>
          </div>
      `;
      shadow.appendChild(ele);
    }
  }

  window.customElements.define("paper2-nav", Paper2Nav);
})();
