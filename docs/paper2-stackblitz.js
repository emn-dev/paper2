function openInStackblitz() {
  const type = document.querySelector("paper2-stackblitz").getAttribute("type");
  const paper2Sb = document.querySelector("paper2-stackblitz").shadowRoot;

  let html = `
        <link rel="stylesheet" href="https://emn-dev.github.io/paper2/paper2-docs.css" />
            <canvas id='myCanvas' resize></canvas>
            `;
  if (type === "core") {
    html += `<script>`;
  } else {
    html += `<script canvas="myCanvas" type="text/paperscript">`;
  }
  const mainPaper2Script1 = document.getElementById("mainPaper2Script1");
  html += mainPaper2Script1.innerHTML + `<\/script>`;

  if (type !== "core") {
    const mainPaper2Script2 = document.getElementById("mainPaper2Script2");
    if (mainPaper2Script2) {
      html += `
        <script>`;
      html += mainPaper2Script2.innerHTML + `<\/script>`;
    }
  }

  const sbInputHtml = paper2Sb.getElementById("sbInputHtml");
  sbInputHtml.value = html;
  paper2Sb.getElementById("sbMainForm").submit();
}
