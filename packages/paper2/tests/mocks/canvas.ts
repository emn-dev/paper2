/* eslint-disable */

function mockCanvas(window: any) {
  window.HTMLCanvasElement.prototype.getContext = () => {
    return {
      fillRect() {},
      clearRect() {},
      getImageData(x: number, y: number, w: number, h: number) {
        return {
          data: new Array(w * h * 4),
        };
      },
      putImageData() {},
      createImageData() {
        return [];
      },
      setTransform() {},
      drawImage() {},
      save() {},
      fillText() {},
      restore() {},
      beginPath() {},
      moveTo() {},
      lineTo() {},
      closePath() {},
      stroke() {},
      translate() {},
      scale() {},
      rotate() {},
      arc() {},
      fill() {},
      measureText() {
        return { width: 0 };
      },
      transform() {},
      rect() {},
      clip() {},
      bezierCurveTo() {},
    };
  };

  window.HTMLCanvasElement.prototype.toDataURL = () => {
    return 'someDataURL';
  };
}

if (typeof window !== 'undefined') mockCanvas(window);
