"use strict";

const allPagesData = [
  {
    file: "animated-animatedStar.html",
    name: "(animated) Animated Star",
  },
  {
    file: "animated-booleanOps.html",
    name: "(animated) Boolean Operations",
  },
  { file: "animated-candyCrash.html", name: "(animated) Candy Crash" },
  { file: "animated-extruded.html", name: "(animated) Extruded" },
  { file: "animated-lines.html", name: "(animated) Lines" },
  { file: "animated-smoothing.html", name: "(animated) Smoothing" },
  { file: "animated-space.html", name: "(animated) Space" },
  {
    file: "animated-spaceUsingShapes.html",
    name: "(animated) Space Using Shapes",
  },
  { file: "nodejs-booleanOpts.html", name: "(nodejs) Boolean Operations" },
  { file: "showcase-rasterSpiral.html", name: "(showcase) Spiral Raster" },
  { file: "showcase-chain.html", name: "(showcase) Chain" },
  { file: "showcase-bouncingBalls.html", name: "(showcase) Bouncing Balls" },
  { file: "showcase-divisionRaster.html", name: "(showcase) Division Raster" },
  {
    file: "showcase-interactiveTiger.html",
    name: "(showcase) Interactive Tiger",
  },
  {
    file: "rasters-phyllotaxisRaster.html",
    name: "(rasters) Phyllotaxis Raster",
  },
  {
    file: "worker-webWorker.html",
    name: "(worker) Web Worker",
  },
  {
    file: "paper2-simple.html",
    name: "(paper2) Simple",
  },
  {
    file: "paper2-straps.html",
    name: "(straps) Straps",
  },
  { file: "tools-wave.html", name: "(tools) Wave" },
  { file: "tools-wormFarm.html", name: "(tools) Worm Farm" },
  { file: "tools-vektor.html", name: "(tools) Vektor" },
  { file: "tools-stars.html", name: "(tools) Stars" },
  { file: "tools-squareRounded.html", name: "(tools) Square Rounded" },
  { file: "tools-pathEditing.html", name: "(tools) Path Editing" },
  { file: "tools-multipleTools.html", name: "(tools) Multiple Tools" },
  { file: "tools-multiLines.html", name: "(tools) Multi Lines" },
  { file: "tools-clouds.html", name: "(tools) Clouds" },
  { file: "tools-circles.html", name: "(tools) Circles" },
  { file: "tools-grid.html", name: "(tools) Grid" },
  { file: "tools-fancyBrush.html", name: "(tools) Fancy Brush" },
  { file: "tools-drippingBrush.html", name: "(tools) Dripping Brush" },
  { file: "tools-bezierTool.html", name: "(tools) Bezier Tool" },
  { file: "json-tiger.html", name: "(json) Tiger" },
  { file: "json-groupTransform.html", name: "(json) Group Transform" },
  { file: "json-gradients.html", name: "(json) Gradients" },
  { file: "json-emptyPathTesting.html", name: "(json) Empty Path Testing" },
  { file: "json-compoundPath.html", name: "(json) Compound Path" },
  { file: "json-circleTesting.html", name: "(json) Circle Testing" },
  { file: "games-paperoids.html", name: "(games) Paperoids" },
  { file: "scripts-pathTangents.html", name: "(scripts) Path Tangents" },
  { file: "scripts-pathStructure.html", name: "(scripts) Path Structure" },
  { file: "scripts-booleanOperations.html", name: "(scripts) Boolean Study" },
  { file: "svg-import-viewbox.html", name: "(svg-import) Viewbox 1" },
  { file: "svg-import-symbols.html", name: "(svg-import) Symbols Test" },
  { file: "svg-import-polybezier.html", name: "(svg-import) Rect Testing" },
  { file: "svg-import-inkscape.html", name: "(svg-import) Inkscape" },
  {
    file: "svg-export-transformTest1.html",
    name: "(svg-export) Transform Testing",
  },
  {
    file: "svg-export-rectAndAttributeTesting.html",
    name: "(svg-export) Rectangle Testing",
  },
  {
    file: "svg-export-circleTesting.html",
    name: "(svg-export) Export Circle (Full)",
  },
  {
    file: "svg-export-circleTestingCore.html",
    name: "(svg-export) Export Circle (Core)",
  },
];

const allPagesDataSorted = allPagesData.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
});

const allPagesHtml = allPagesData.reduce((a, b) => {
  return `${a}\n<a href="${b.file}">${b.name}</a>`;
}, "");

(function () {
  const sharedStyles = new CSSStyleSheet();
  sharedStyles.replaceSync(`    
      .sidebar {
        height: 100%;
        width: 325px;
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
            <a style="margin-top:3rem;" href="/">Home</a>
            ${allPagesHtml}
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
      <button type="button" onclick="openInStackblitz()">
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
