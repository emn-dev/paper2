"use strict";

const allPagesData = [
  {
    file: "animated-animatedStar.html",
    name: "(animated) Animated Star",
    hasCyTest: true,
  },
  {
    file: "animated-booleanOps.html",
    name: "(animated) Boolean Operations",
    hasCyTest: true,
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
  // This = https://github.com/paperjs/paper.js/blob/develop/examples/Animated/BooleanOperations.html
  // is same as this = https://github.com/paperjs/paper.js/blob/develop/examples/Paperjs.org/BooleanOperattions.html
  {
    file: "animated-booleanOps.html",
    name: "(showcase) Path Intersections aka Boolean Opts",
    hasCyTest: true,
  },
  { file: "showcase-rasterSpiral.html", name: "(showcase) Spiral Raster" },
  { file: "showcase-chain.html", name: "(showcase) Chain", hasCyTest: true },
  { file: "showcase-bouncingBalls.html", name: "(showcase) Bouncing Balls" },
  {
    file: "showcase-divisionRaster.html",
    name: "(showcase) Division Raster",
    hasCyTest: true,
  },
  {
    file: "showcase-interactiveTiger.html",
    name: "(showcase) Interactive Tiger",
    hasCyTest: true,
  },
  {
    file: "showcase-futureSplash.html",
    name: "(showcase) Future Splash",
    hasCyTest: false,
  },
  {
    file: "showcase-hitTesting.html",
    name: "(showcase) Hit Testing",
    hasCyTest: false,
  },
  {
    file: "showcase-metaBalls.html",
    name: "(showcase) Meta Balls",
    hasCyTest: true,
  },
  {
    file: "showcase-nyanRainbow.html",
    name: "(showcase) Nyan Rainbow",
    hasCyTest: false,
  },
  {
    file: "showcase-pathIntersections.html",
    name: "(showcase) Path Intersections",
    hasCyTest: true,
  },
  {
    file: "showcase-qbertify.html",
    name: "(showcase) Q*bertify",
    hasCyTest: true,
  },
  {
    file: "showcase-radialRainbows.html",
    name: "(showcase) Radial Rainbows",
    hasCyTest: false,
  },
  {
    file: "showcase-roundedRectangles.html",
    name: "(showcase) Rounded Rectangles",
    hasCyTest: false,
  },
  {
    file: "showcase-satieLikedToDraw.html",
    name: "(showcase) Erik Liked To Dance",
    hasCyTest: false,
  },
  {
    file: "showcase-simplify.html",
    name: "(showcase) Simplify",
    hasCyTest: true,
  },
  {
    file: "showcase-tadpoles.html",
    name: "(showcase) Tadpoles",
    hasCyTest: false,
  },
  {
    file: "showcase-voronoi.html",
    name: "(showcase) Voronoi",
    hasCyTest: false,
  },
  {
    file: "rasters-phyllotaxisRaster.html",
    name: "(rasters) Phyllotaxis Raster",
    hasCyTest: false,
  },
  {
    file: "rasters-raster.html",
    name: "(rasters) Raster",
    hasCyTest: false,
  },
  {
    file: "rasters-rotationRaster.html",
    name: "(rasters) Rotation Raster",
    hasCyTest: true,
  },
  {
    file: "rasters-smoothing.html",
    name: "(rasters) Smoothing",
    hasCyTest: true,
  },
  {
    file: "worker-webWorker.html",
    name: "(worker) Web Worker",
    hasCyTest: true,
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
  { file: "tools-vektor.html", name: "(tools) Vektor", hasCyTest: true },
  { file: "tools-stars.html", name: "(tools) Stars", hasCyTest: true },
  {
    file: "tools-squareRounded.html",
    name: "(tools) Square Rounded",
    hasCyTest: true,
  },
  { file: "tools-pathEditing.html", name: "(tools) Path Editing" },
  { file: "tools-multipleTools.html", name: "(tools) Multiple Tools" },
  {
    file: "tools-multiLines.html",
    name: "(tools) Multi Lines",
    hasCyTest: true,
  },
  { file: "tools-clouds.html", name: "(tools) Clouds", hasCyTest: true },
  { file: "tools-circles.html", name: "(tools) Circles", hasCyTest: true },
  { file: "tools-grid.html", name: "(tools) Grid", hasCyTest: true },
  { file: "tools-fancyBrush.html", name: "(tools) Fancy Brush" },
  { file: "tools-drippingBrush.html", name: "(tools) Dripping Brush" },
  {
    file: "tools-bezierTool.html",
    name: "(tools) Bezier Tool",
    hasCyTest: true,
  },
  { file: "json-tiger.html", name: "(json) Tiger", hasCyTest: true },
  {
    file: "json-groupTransform.html",
    name: "(json) Group Transform",
    hasCyTest: true,
  },
  { file: "json-gradients.html", name: "(json) Gradients", hasCyTest: true },
  {
    file: "json-emptyPathTesting.html",
    name: "(json) Empty Path Testing",
    hasCyTest: true,
  },
  {
    file: "json-compoundPath.html",
    name: "(json) Compound Path",
    hasCyTest: true,
  },
  {
    file: "json-circleTesting.html",
    name: "(json) Circle Testing",
    hasCyTest: true,
  },
  {
    file: "json-lineTesting.html",
    name: "(json) Line Testing",
    hasCyTest: true,
  },
  {
    file: "json-randomPathTesting.html",
    name: "(json) Random Path Testing",
    hasCyTest: true,
  },
  {
    file: "json-raster.html",
    name: "(json) Raster",
    hasCyTest: true,
  },
  {
    file: "json-rectAndAttributeTesting.html",
    name: "(json) Rectangle Testing",
    hasCyTest: true,
  },
  {
    file: "json-rotatedPrimitives.html",
    name: "(json) Rotated Primitives",
    hasCyTest: true,
  },
  {
    file: "json-selection.html",
    name: "(json) Selection",
    hasCyTest: true,
  },
  {
    file: "json-shapes.html",
    name: "(json) Shapes",
    hasCyTest: true,
  },
  {
    file: "json-symbols.html",
    name: "(json) Symbols",
    hasCyTest: true,
  },
  {
    file: "json-textTesting.html",
    name: "(json) Text Testing",
    hasCyTest: true,
  },
  {
    file: "json-transformTesting.html",
    name: "(json) Transform Testing",
    hasCyTest: true,
  },
  {
    file: "json-transformTesting2.html",
    name: "(json) Transform Testing 2",
    hasCyTest: true,
  },
  { file: "games-paperoids.html", name: "(games) Paperoids" },
  {
    file: "scripts-pathTangents.html",
    name: "(scripts) Path Tangents",
    hasCyTest: true,
  },
  {
    file: "scripts-pathStructure.html",
    name: "(scripts) Path Structure",
    hasCyTest: true,
  },
  {
    file: "scripts-arcs.html",
    name: "(scripts) Arcs",
    hasCyTest: true,
  },
  {
    file: "scripts-blendModes.html",
    name: "(scripts) BlendModes",
    hasCyTest: false,
  },
  {
    file: "scripts-compoundPath.html",
    name: "(scripts) Compound Path",
    hasCyTest: true,
  },
  {
    file: "scripts-curveTimeParameterization.html",
    name: "(scripts) Curve Time Parameterization",
    hasCyTest: true,
  },
  {
    file: "scripts-hslColor.html",
    name: "(scripts) HslColor",
    hasCyTest: true,
  },
  {
    file: "scripts-resize.html",
    name: "(scripts) Resize",
    hasCyTest: true,
  },
  {
    file: "scripts-strokeBounds.html",
    name: "(scripts) Stroke Bounds",
    hasCyTest: true,
  },
  {
    file: "scripts-strokeScaling.html",
    name: "(scripts) Shapes 2",
    hasCyTest: true,
  },
  { file: "scripts-booleanOperations.html", name: "(scripts) Boolean Study" },
  { file: "scripts-roundRectangle.html", name: "(scripts) Rounded Rectangle" },
  { file: "scripts-shapes.html", name: "(scripts) Shapes", hasCyTest: true },
  {
    file: "svg-import-viewbox.html",
    name: "(svg-import) Viewbox 1",
    hasCyTest: true,
  },
  {
    file: "svg-import-symbols.html",
    name: "(svg-import) Symbols Test",
    hasCyTest: true,
  },
  {
    file: "svg-import-polybezier.html",
    name: "(svg-import) Polybezier",
    hasCyTest: false,
  },
  {
    file: "svg-import-inkscape.html",
    name: "(svg-import) Inkscape",
    hasCyTest: true,
  },
  {
    file: "svg-import-arcs.html",
    name: "(svg-import) Arcs Testing",
    hasCyTest: false,
  },
  {
    file: "svg-import-lineTesting.html",
    name: "(svg-import) Line Testing",
    hasCyTest: true,
  },
  {
    file: "svg-import-gradient.html",
    name: "(svg-import) Gradient",
    hasCyTest: true,
  },
  {
    file: "svg-import-gradients.html",
    name: "(svg-import) Gradients",
    hasCyTest: true,
  },
  {
    file: "svg-import-inkscapePivot.html",
    name: "(svg-import) Inkscape Pivot",
    hasCyTest: true,
  },
  {
    file: "svg-import-fromFile.html",
    name: "(svg-import) From File",
    hasCyTest: true,
  },
  {
    file: "svg-import-clipping.html",
    name: "(svg-import) Clipping",
    hasCyTest: true,
  },
  {
    file: "svg-import-butterfly.html",
    name: "(svg-import) Butterfly",
    hasCyTest: true,
  },
  {
    file: "svg-import-circleAndEllipseTesting.html",
    name: "(svg-import) Circle and Ellipse Testing",
    hasCyTest: true,
  },
  {
    file: "svg-import-transformTesting.html",
    name: "(svg-import) Transform Testing",
    hasCyTest: true,
  },
  {
    file: "svg-import-gradients2.html",
    name: "(svg-import) Gradients 2",
    hasCyTest: true,
  },
  {
    file: "svg-import-nestedGroupsTest.html",
    name: "(svg-import) Nested Groups Test",
    hasCyTest: true,
  },
  {
    file: "svg-import-rectTesting.html",
    name: "(svg-import) Rect Testing",
    hasCyTest: true,
  },
  {
    file: "svg-import-strokeBounds.html",
    name: "(svg-import) Stroke Bounds",
    hasCyTest: true,
  },
  {
    file: "svg-import-tiger.html",
    name: "(svg-import) Tiger",
    hasCyTest: true,
  },
  {
    file: "svg-import-textTesting.html",
    name: "(svg-import) Text Testing",
    hasCyTest: false,
  },
  {
    file: "svg-import-multiplePathsTest1.html",
    name: "(svg-import) Multiple Paths Test 1",
    hasCyTest: true,
  },
  {
    file: "svg-import-multiplePathsTest2.html",
    name: "(svg-import) Multiple Paths Test 2",
    hasCyTest: true,
  },
  {
    file: "svg-export-transformTest1.html",
    name: "(svg-export) Transform Testing",
    hasCyTest: true,
  },
  {
    file: "svg-export-rectAndAttributeTesting.html",
    name: "(svg-export) Rectangle Testing",
    hasCyTest: true,
  },
  {
    file: "svg-export-circleTesting.html",
    name: "(svg-export) Export Circle (Full)",
  },
  {
    file: "svg-export-circleTestingCore.html",
    name: "(svg-export) Export Circle (Core)",
    hasCyTest: true,
  },
  {
    file: "svg-export-clipping.html",
    name: "(svg-export) Clipping",
    hasCyTest: true,
  },
  {
    file: "svg-export-compoundPath.html",
    name: "(svg-export) Compound Path",
    hasCyTest: true,
  },
  {
    file: "svg-export-emptyPathTesting.html",
    name: "(svg-export) Empty Path Testing",
    hasCyTest: true,
  },
  {
    file: "svg-export-gradients.html",
    name: "(svg-export) Gradients",
    hasCyTest: true,
  },
  {
    file: "svg-export-groupTransform.html",
    name: "(svg-export) Group Transform",
    hasCyTest: true,
  },
  {
    file: "svg-export-lineTesting.html",
    name: "(svg-export) Line Testing",
    hasCyTest: true,
  },
  {
    file: "svg-export-randomPathTesting.html",
    name: "(svg-export) Random Path Testing",
    hasCyTest: true,
  },
  {
    file: "svg-export-raster.html",
    name: "(svg-export) Raster",
    hasCyTest: true,
  },
  {
    file: "svg-export-rotatedPrimitives.html",
    name: "(svg-export) Rotated Primitives",
    hasCyTest: true,
  },
  {
    file: "svg-export-shapes.html",
    name: "(svg-export) Shapes",
    hasCyTest: true,
  },
  {
    file: "svg-export-symbols.html",
    name: "(svg-export) Symbols",
    hasCyTest: true,
  },
  {
    file: "svg-export-textTesting.html",
    name: "(svg-export) Text Testing",
    hasCyTest: false,
  },
  {
    file: "svg-export-tiger.html",
    name: "(svg-export) Tiger",
    hasCyTest: true,
  },
  {
    file: "svg-export-transformTest2.html",
    name: "(svg-export) Transform Test 2",
    hasCyTest: true,
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
  return `${a}\n<a ${b.hasCyTest ? "data-has-cy-test=yes" : ""} href="${b.file}">${b.name}</a>`;
}, "");

window.allPagesHtml = allPagesHtml;

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
