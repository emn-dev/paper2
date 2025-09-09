// Uncomment this to fix CODE_BLOCK_1
import fs from "fs";
import path from "path";
import "../packages/paper2/dist/jsdom-canvas-setup.js";
import { paper } from "../packages/paper2/dist/paper2-core.js";

// Override requestAnimationFrame() to avoid setInterval() timers.
// NOTE: In Node.js, we only support manual updating for now, but
// View#exportFrames() below offers a way to emulate animations by exporting
// them frame by frame at the given frame-rate.
paper.DomEvent.requestAnimationFrame = function (callback) {};

// Node.js based image exporting code.
paper.CanvasView.inject({
  // DOCS: CanvasView#exportFrames(options);
  exportFrames: function (options) {
    options = paper.Base.set(
      {
        fps: 30,
        prefix: "frame-",
        amount: 1,
        format: "png", // Supported: 'png' or 'jpeg'
      },
      options
    );
    if (!options.directory) throw new Error("Missing options.directory");
    if (options.format && !/^(jpeg|png)$/.test(options.format))
      throw new Error('Unsupported format. Use "png" or "jpeg"');
    var view = this,
      count = 0,
      frameDuration = 1 / options.fps,
      startTime = Date.now(),
      lastTime = startTime,
      padding = options.padding || (options.amount - 1 + "").length,
      paddedStr = Array(padding + 1).join("0");

    // Start exporting frames by exporting the first frame:
    exportFrame(options);

    function exportFrame() {
      // Convert to a Base object, for #toString()
      view.emit(
        "frame",
        new paper.Base({
          delta: frameDuration,
          time: frameDuration * count,
          count: count,
        })
      );
      var file = path.join(
        options.directory,
        options.prefix +
          (paddedStr + count).slice(-padding) +
          "." +
          options.format
      );
      var out = view.exportImage(file, function () {
        // Once the file has been closed, export the next fame:
        var then = Date.now();
        if (options.onProgress) {
          options.onProgress({
            count: count,
            amount: options.amount,
            percentage:
              Math.round(((count + 1) / options.amount) * 10000) / 100,
            time: then - startTime,
            delta: then - lastTime,
          });
        }
        lastTime = then;
        if (++count < options.amount) {
          exportFrame();
        } else {
          // Call onComplete handler when finished:
          if (options.onComplete) {
            options.onComplete();
          }
        }
      });
    }
  },

  // DOCS: CanvasView#exportImage(path, callback);
  exportImage: function (path, callback) {
    this.update();
    var out = fs.createWriteStream(path),
      format = /\.jp(e?)g$/.test(path) ? "jpeg" : "png",
      stream = this._element[format + "Stream"]();
    stream.pipe(out);
    if (callback) {
      out.on("close", callback);
    }
    return out;
  },
});

var canvas22 = paper.createCanvas(800, 800);
paper.setup(canvas22);

// paper.setup(new paper.Size(1024, 768));

var layer = paper.project.activeLayer;

var values = {
  count: 34,
  points: 32,
};

paper.view.exportFrames({
  amount: 31,
  // directory: __dirname,
  directory: "./animatedStar-temp",
  onComplete: function () {
    console.log("Done exporting.");
  },
  onProgress: function (event) {
    console.log(event.percentage + "% complete, frame took: " + event.delta);
  },
});

function initialize() {
  for (var i = 0; i < values.count; i++) {
    var offset = new paper.Point(20 + 10 * i, 0);
    var path = new paper.Path();
    path.fillColor = i % 2 ? "red" : "black";
    path.closed = true;

    var l = offset.length;
    for (var j = 0; j < values.points * 2; j++) {
      offset.angle += 360 / values.points;
      var vector = offset.normalize(l * (j % 2 ? 0.1 : -0.1));
      path.add(offset.add(vector));
    }
    path.smooth();
    layer.insertChild(0, path);
  }
  layer.fitBounds(paper.view.bounds);
}

paper.view.onFrame = function (event) {
  for (var i = 0, l = layer.children.length; i < l; i++) {
    var item = layer.children[i];
    var angle = ((values.count - i) * Math.sin(event.count / 128)) / 10;
    item.rotate(angle);
  }
};

initialize();
