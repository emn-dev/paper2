import { describe, it } from 'vitest';
import { Base } from '~/straps';
import { Point, Path, Color, CompoundPath, paper, Raster, Rectangle, Size } from '~/index-core';
import { DomEvent } from '~/dom/DomEvent';
import { equals } from './_helpers';

// TODO: these are going to need some figuring out... I think we will need a canvas instance

describe('Given: Raster', () => {
  function pushFailure(msg: string) {
    console.log('PUSH-FAILURE = ', msg);
  }

  it('Create a raster without a source and check its size', () => {
    const raster = new Raster();
    equals(raster.size, new Size(0, 0), 'true');
  });

  it('Create a raster without a source and set its size', () => {
    const raster = new Raster();
    raster.size = [640, 480];
    equals(raster.size, new Size(640, 480), 'true');
  });

  it('Create a raster from a URL', () => {
    const raster = new Raster('assets/paper-js.gif');
    raster.onLoad = function () {
      equals(raster.size, new Size(146, 146), 'true');
    };
    raster.onError = function () {
      pushFailure('Loading from a valid local URL should not give an error.');
    };
  });

  it('Create a raster from a data URL', () => {
    const raster = new Raster(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABlJREFUeNpi+s/AwPCfgYmR4f9/hv8AAQYAHiAFAS8Lwy8AAAAASUVORK5CYII='
    );
    raster.onLoad = function () {
      equals(raster.size, new Size(2, 2), 'true');
    };
    raster.onError = function () {
      pushFailure('Loading from a valid data URL should not give an error.');
    };
  });

  it('Create a raster from a dom image', () => {
    const img = document.createElement('img');
    img.src = 'assets/paper-js.gif';
    document.body.appendChild(img);
    DomEvent.add(img, {
      load: function () {
        const raster = new Raster(img);
        equals(raster.size, new Size(146, 146), 'true');
        document.body.removeChild(img);
      },
      error: function () {
        pushFailure('Loading from a valid data URL should not give an error.');
      },
    });
  });

  it('Create a raster from a canvas', () => {
    const canvas = paper.createCanvas(30, 20);
    const raster = new Raster(canvas);
    equals(raster.size, new Size(30, 20), 'true');
  });

  it('Create a raster from a dom id', () => {
    const img = document.createElement('img');
    img.src = 'assets/paper-js.gif';
    img.id = 'testimage';
    document.body.appendChild(img);
    DomEvent.add(img, {
      load: function () {
        const raster = new Raster('testimage');
        equals(raster.size, new Size(146, 146), 'true');
        document.body.removeChild(img);
      },
      error: function () {
        pushFailure('Loading from a valid data URL should not give an error.');
      },
    });
  });

  it('Raster#getPixel / setPixel', () => {
    const raster = new Raster(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABlJREFUeNpi+s/AwPCfgYmR4f9/hv8AAQYAHiAFAS8Lwy8AAAAASUVORK5CYII='
    );
    raster.onLoad = function () {
      equals(raster.getPixel(0, 0), new Color(1, 0, 0, 1));
      equals(raster.getPixel(1, 0), new Color(0, 1, 0, 1));
      equals(raster.getPixel(0, 1), new Color(0, 0, 1, 1));
      equals(raster.getPixel(1, 1), new Color(1, 1, 1, 1));

      // Alpha
      const color = new Color(1, 1, 0, 0.50196);
      raster.setPixel([0, 0], color);
      equals(raster.getPixel([0, 0]), color, 'alpha', { tolerance: 1e-2 });
    };
  });

  it('Raster#getSubCanvas', () => {
    const raster = new Raster(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABlJREFUeNpi+s/AwPCfgYmR4f9/hv8AAQYAHiAFAS8Lwy8AAAAASUVORK5CYII='
    );
    raster.onLoad = function () {
      const canvas = raster.getSubCanvas(
        new Rectangle({
          point: [1, 0],
          size: [1, 2],
        })
      );
      equals(function () {
        return canvas.width;
      }, 1);
      equals(function () {
        return canvas.height;
      }, 2);
      const ctx = canvas.getContext('2d');
      const expected = [
        // green pixel:
        0, 255, 0, 255,
        // white pixel:
        255, 255, 255, 255,
      ];
      equals(function () {
        return Base.equals(Base.slice(ctx.getImageData(0, 0, 1, 2).data), expected);
      }, true);
    };
  });

  it('Raster#getAverageColor(path)', () => {
    // eslint-disable-next-line no-new
    new Path.Rectangle({
      point: [0, 0],
      size: [100, 100],
      fillColor: new Color(0, 1, 0),
    }); // rect
    const circle = new Path.Circle({
      center: [50, 50],
      radius: 25,
      fillColor: new Color(1, 0, 0),
    });
    const raster = paper.project.activeLayer.rasterize(72);
    circle.scale(0.8);

    equals(raster.getAverageColor(circle), circle.fillColor, null, { tolerance: 1e-3 });
  });

  // TODO: why is this broken?
  it('Raster#getAverageColor(path) with compound path', () => {
    new Path.Rectangle({
      point: [0, 0],
      size: [100, 100],
      fillColor: new Color(0, 1, 0),
    });
    const path = new Path.Circle({
      center: [50, 50],
      radius: 25,
    });
    const path2 = new Path.Circle({
      center: [50, 50],
      radius: 10,
    });
    const compoundPath = new CompoundPath(path, path2);
    compoundPath.fillColor = new Color(1, 0, 0);
    const raster = paper.project.activeLayer.rasterize(72);
    path.scale(0.8);
    path2.scale(1.2);

    equals(raster.getAverageColor(compoundPath), new Color(1, 0, 0), null, { tolerance: 1e-3 });
  });

  it("Raster#smoothing defaults to 'low'", () => {
    const raster = new Raster();
    equals(raster.smoothing, 'low');
  });

  it('Raster#smoothing', () => {
    const raster = new Raster({ smoothing: 'off' });
    equals(raster.smoothing, 'off');

    raster.smoothing = 'medium';
    equals(raster.smoothing, 'medium');

    raster.smoothing = false;
    equals(raster.smoothing, 'off');

    raster.smoothing = true;
    equals(raster.smoothing, 'low');
  });

  it('Raster#smoothing setting does not impact canvas context', () => {
    const raster = new Raster(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABlJREFUeNpi+s/AwPCfgYmR4f9/hv8AAQYAHiAFAS8Lwy8AAAAASUVORK5CYII='
    );
    const view = raster.view;
    const context = view._context;
    raster.onLoad = function () {
      const originalValue = context.imageSmoothingEnabled;
      raster.smoothing = false;
      view.update();
      equals(context.imageSmoothingEnabled, originalValue);
    };
  });

  it('new Raster(size[, position])', () => {
    // Size only.
    let raster = new Raster(new Size(100, 100));
    equals(raster.position, new Point(0, 0));
    equals(raster.bounds, new Rectangle(-50, -50, 100, 100));

    raster = new Raster({ size: new Size(100, 100) });
    equals(raster.position, new Point(0, 0));
    equals(raster.bounds, new Rectangle(-50, -50, 100, 100));

    raster = new Raster({ width: 100, height: 100 });
    equals(raster.position, new Point(0, 0));
    equals(raster.bounds, new Rectangle(-50, -50, 100, 100));

    // Size and position.
    raster = new Raster(new Size(100, 100), new Point(100, 100));
    equals(raster.position, new Point(100, 100));
    equals(raster.bounds, new Rectangle(50, 50, 100, 100));

    raster = new Raster({ size: new Size(100, 100), position: new Point(100, 100) });
    equals(raster.position, new Point(100, 100));
    equals(raster.bounds, new Rectangle(50, 50, 100, 100));

    raster = new Raster({ width: 100, height: 100, position: new Point(100, 100) });
    equals(raster.position, new Point(100, 100));
    equals(raster.bounds, new Rectangle(50, 50, 100, 100));
  });
});
