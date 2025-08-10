"use strict";

(function () {
  class Paper2Nav extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: "open" });
      const ele = document.createElement("nav");
      ele.innerHTML = `
        <style>
        .paper2NavTable {
          width: 100%;
          background-color: #ddd;
          margin: 0 auto;
        }
        </style>
        <table class="paper2NavTable">
            <tr>
                <td><a href="index.html">Home</a></td><td>&nbsp;|&nbsp;</td>
                <td><a href="straps.html">Straps</a></td><td>&nbsp;|&nbsp;</td>
                <td><a href="simple.html">Simple</a></td><td>&nbsp;|&nbsp;</td>
                <td><a href="booleanOps.html">Boolean Operations</a></td><td>&nbsp;|&nbsp;</td>
                <td><a href="chain.html">Chain</a></td><td>&nbsp;|&nbsp;</td>
                <td><a href="exportCircle.html">Export Circle</a></td><td>&nbsp;|&nbsp;</td>                
                <td><a href="importViewbox.html">Import Viewbox 1</a></td><td>&nbsp;|&nbsp;</td>                
                <td><a href="rasterSpiral.html">Spiral Raster</a></td>
            </tr>
        </table>
      `;
      shadow.appendChild(ele);
    }
  }

  window.customElements.define("paper2-nav", Paper2Nav);
})();
