"use strict";

(function () {
  const sharedStyles = new CSSStyleSheet();
  sharedStyles.replaceSync(`    
      .sidebar {
        height: 100%;
        width: 250px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #333;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        display: flex;
        flex-direction: column;
      }

      .sidebar.active {
        transform: translateX(0);
      }

      /* Make nav links scrollable */
      .sidebar-nav {
        flex: 1; /* take available space */
        overflow-y: auto;
        padding-top: 20px;
      }

      .sidebar-nav a {
        padding: 12px 20px;
        text-decoration: none;
        font-size: 18px;
        color: white;
        display: block;
        transition: background 0.2s;
      }

      .sidebar-nav a:hover {
        background-color: #575757;
      }

      .hamburger {
        position: fixed;
        top: 15px;
        left: 15px;
        font-size: 24px;
        cursor: pointer;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        z-index: 1100;
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
        z-index: 900;
      }

      .overlay.active {
        opacity: 1;
        visibility: visible;
      }

      /* Improve scrolling on iOS */
      .sidebar-nav {
        -webkit-overflow-scrolling: touch;
      }
  `);

  class Paper2Nav extends HTMLElement {
    constructor() {
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      shadow.adoptedStyleSheets = [sharedStyles];
      const ele1 = document.createElement("div");
      ele1.innerHTML = `<div class="hamburger" onclick="toggleSidebar()">☰</div>`;
      const ele2 = document.createElement("div");
      ele2.innerHTML = `<div class="sidebar" id="sidebar">
          <div class="sidebar-nav">
            <a style="margin-top:3rem;" href="index.html">Home</a>
            <a href="animated-animatedStar.html">Animated Star</a>
            <a href="tools-bezierTool.html">Bezier Tool</a>
            <a href="nodejs-BooleanOperations.html">BoolOpts (rendered on Nodejs)</a>
            <a href="animated-booleanOps.html">Boolean Ops</a>
            <a href="scripts-booleanOperations.html">Boolean Study</a>
            <a href="animated-candyCrash.html">Candy Crash</a>
            <a href="paperjs-org-chain.html">Chain</a>
            <a href="json-circleTesting.html">Circle Testing (JSON)</a>
            <a href="json-compoundPath.html">Compound Path (JSON)</a>
            <a href="tools-drippingBrush.html">Dripping Brush</a>
            <a href="json-emptyPathTesting.html">Empty Path Testing (JSON)</a>
            <a href="svg-export-circleTestingCore.html">Export Circle (Core)</a>
            <a href="svg-export-circleTesting.html">Export Circle (Full)</a>
            <a href="animated-extruded.html">Extruded</a>
            <a href="tools-fancyBrush.html">Fancy Brush</a>
            <a href="tools-grid.html">Grid</a>
            <a href="json-gradients.html">Gradients (JSON)</a>
            <a href="json-groupTransform.html">Group Transform (JSON)</a>
            <a href="svg-import-viewbox.html">Import Viewbox 1</a>
            <a href="svg-import-inkscape.html">Inkscape</a>            
            <a href="animated-lines.html">Lines</a>
            <a href="tools-multipleTools.html">Multiple Tools</a>
            <a href="games-paperoids.html">Paperoids</a>
            <a href="tools-pathEditing.html">Path Editing</a>
            <a href="scripts-pathStructure.html">Path Structure</a>
            <a href="scripts-pathTangents.html">Path Tangents</a>
            <a href="rasters-phyllotaxisRaster.html">Phyllotaxis Raster</a>
            <a href="simple.html">Simple</a>
            <a href="animated-smoothing.html">Smoothing</a>
            <a href="animated-space.html">Space</a>
            <a href="animated-spaceUsingShapes.html">SpaceUsingShapes</a>
            <a href="svg-import-symbols.html">Symbols Test</a>
            <a href="paperjs-org-rasterSpiral.html">Spiral Raster</a>
            <a href="straps.html">Straps</a>
            <a href="json-tiger.html">Tiger</a>
            <a href="tools-vektor.html">Vektor</a>
            <a href="tools-wave.html">Wave</a>
            <a href="worker-webWorker.html">Web Worker</a>
            <a href="tools-wormFarm.html">Worm Farm</a>
        </div>
    </div>`;
      const ele3 = document.createElement("div");
      ele3.innerHTML = `<div class="overlay" id="overlay" onclick="toggleSidebar()"></div>`;
      const ele4 = document.createElement("div");
      ele4.innerHTML = `<div class="hamburger" onclick="toggleSidebar()">☰</div>`;

      shadow.appendChild(ele1);
      shadow.appendChild(ele2);
      shadow.appendChild(ele3);
      shadow.appendChild(ele4);
    }
  }

  class Paper2Stackblitz extends HTMLElement {
    constructor() {
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      const ele = document.createElement("form");
      ele.id = "sbMainForm";
      ele.method = "post";
      ele.action = "https://stackblitz.com/run?file=index.html";
      ele.target = "_blank";
      ele.innerHTML = `          
        <input
          type="hidden"
          name="project[files][index.js]"
          value="// this file empty on purpose, put your code in the script in index.html"
        />
        <input
          type="hidden"
          id="sbInputHtml"
          name="project[files][index.html]"
          value=""
        />
        <input
          type="hidden"
          name="project[description]"
          value="Paper2 Example"
        />
        <input type="hidden" name="project[template]" value="javascript" />
        <input
          type="hidden"
          name="project[settings]"
          value='{"compile":{"clearConsole":false}}'
        />
            <button
      style="float: right; margin: 0.5em"
      type="button"
      onclick="openInStackblitz()"
    >
      Try in Stackblitz
    </button>
      `;
      shadow.appendChild(ele);
    }
  }
  window.customElements.define("paper2-nav", Paper2Nav);
  window.customElements.define("paper2-stackblitz", Paper2Stackblitz);
})();

function toggleSidebar() {
  const paper2Nav = document.querySelector("paper2-nav").shadowRoot;
  paper2Nav.getElementById("sidebar").classList.toggle("active");
  paper2Nav.getElementById("overlay").classList.toggle("active");
}
