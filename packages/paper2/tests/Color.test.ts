import { describe, it } from 'vitest';
import { Color, Path, Gradient, GradientStop, Group, Shape } from '~/index-core';
import { equals } from './_helpers';

// Some tests require node-canvas to work correctly
describe('Given: Color Class', () => {
  it('Set named color', () => {
    const path = new Path();
    path.fillColor = 'red';

    equals(path.fillColor, new Color(1, 0, 0));
    equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
  });

  it('Set color to hex', () => {
    const path = new Path();
    path.fillColor = '#ff0000';
    equals(path.fillColor, new Color(1, 0, 0));
    equals(path.fillColor.toCSS(), 'rgb(255,0,0)');

    const path2 = new Path();
    path2.fillColor = '#f00';
    equals(path2.fillColor, new Color(1, 0, 0));
    equals(path2.fillColor.toCSS(), 'rgb(255,0,0)');
  });

  it('Set color to object', () => {
    const path = new Path();
    path.fillColor = { red: 1, green: 0, blue: 1 };
    equals(path.fillColor, new Color(1, 0, 1));
    equals(path.fillColor.toCSS(), 'rgb(255,0,255)');

    const path2 = new Path();
    path2.fillColor = { gray: 0.2 };
    equals(path2.fillColor, new Color(0.2));
    equals(path2.fillColor.toCSS(), 'rgb(51,51,51)');
  });

  it('Set color to array', () => {
    const path = new Path();
    path.fillColor = [1, 0, 0];
    equals(path.fillColor, new Color(1, 0, 0));
    equals(path.fillColor.toCSS(), 'rgb(255,0,0)');
  });

  it('Creating colors', () => {
    equals(new Color(), new Color(0, 0, 0), 'Color with no arguments should be black');
    equals(new Color('black'), new Color(0, 0, 0), 'Color from name (black)');

    equals(new Color('red'), new Color(1, 0, 0), 'Color from name (red)');

    equals(new Color('transparent'), new Color(0, 0, 0, 0), 'Color from name (transparent)');

    equals(new Color('#ff0000'), new Color(1, 0, 0), 'Color from hex string');

    equals(new Color('#FF3300'), new Color(1, 0.2, 0), 'Color from uppercase hex string');

    equals(new Color('#f009'), new Color(1, 0, 0, 0.6), 'Color from 4 characters hex code with alpha');

    equals(new Color('#ff000099'), new Color(1, 0, 0, 0.6), 'Color from 8 characters hex code with alpha');

    equals(new Color('rgb(255, 0, 0)'), new Color(1, 0, 0), 'Color from rgb() string');

    equals(new Color('rgba(255, 0, 0, 0.5)'), new Color(1, 0, 0, 0.5), 'Color from rgba() string');

    equals(new Color('rgba( 255, 0, 0, 0.5 )'), new Color(1, 0, 0, 0.5), 'Color from rgba() string 2nd test');

    equals(new Color('rgb(100%, 50%, 0%)'), new Color(1, 0.5, 0), 'Color from rgb() percenst string');

    equals(
      new Color('hsl(180deg, 20%, 40%)'),
      new Color({ hue: 180, saturation: 0.2, lightness: 0.4 }),
      'Color from hsl() string'
    );

    equals(new Color({ red: 1, green: 0, blue: 1 }), new Color(1, 0, 1), 'Color from RGB object literal');

    equals(new Color({ gray: 0.2 }), new Color(0.2), 'Color from gray object literal');

    equals(
      new Color({ hue: 0, saturation: 1, brightness: 1 }),
      new Color(1, 0, 0).convert('hsb'),
      'Color from HSB object literal'
    );

    equals(new Color([1, 0, 0]), new Color(1, 0, 0), 'RGB Color from array');

    equals(new Color([1]), new Color(1), 'Gray Color from array');
  });

  it('Get gray from RGB Color', () => {
    const color = new Color(1, 0.5, 0.2);
    equals(color.gray, 0.6152);

    const color2 = new Color(0.5, 0.2, 0.1);
    equals(color2.gray, 0.27825);
  });

  it('Get gray from HSB Color', () => {
    const color = new Color({ hue: 0, saturation: 0, brightness: 0.2 });
    equals(color.gray, 0.19998);
  });

  it('Get red from HSB Color', () => {
    const color = new Color({ hue: 0, saturation: 1, brightness: 1 });
    equals(color.red, 1);
  });

  it('Get hue from RGB Color', () => {
    const color = new Color(1, 0, 0);
    equals(color.hue, 0);
    equals(color.saturation, 1);
  });

  it('Get gray after conversion', () => {
    const color = new Color(1);
    equals(color.gray, 1, 'color.gray');
    equals(color.red, 1, 'color.red');
    equals(color.blue, 1, 'color.blue');

    color.red = 0.5;
    equals(color.gray, 0.85045, 'color.gray');

    color.green = 0.2;

    equals(color.red, 0.5, 'color.red');
    equals(color.green, 0.2, 'color.green');
    equals(color.blue, 1, 'color.blue');

    equals(color.gray, 0.38085, 'color.gray');
  });

  it('Converting Colors', () => {
    const rgbColor = new Color(1, 0.5, 0.2);
    equals(rgbColor.gray, 0.6152);
    const grayColor = new Color(0.2);
    equals(grayColor.convert('rgb'), new Color(0.2, 0.2, 0.2));
    equals(grayColor.convert('hsb'), new Color({ hue: 0, saturation: 0, brightness: 0.2 }));
    equals(new Color(1, 0, 0).convert('hsb'), new Color({ hue: 0, saturation: 1, brightness: 1 }));
  });

  it('Setting Color#gray', () => {
    const color = new Color(1, 0.5, 0.2);
    color.gray = 0.1;
    equals(color, new Color(0.1));
  });

  it('Setting Color#red', () => {
    const color = new Color({ hue: 180, saturation: 0, brightness: 0 });
    color.red = 1;
    equals(color, new Color(1, 0, 0));
  });

  it('Setting Color#gray 2', () => {
    const color = new Color({ hue: 180, saturation: 0, brightness: 0 });
    color.gray = 0.5;
    equals(color, new Color(0.5));
  });

  it('Color.read()', () => {
    const color = Color.read([0, 0, 1]);
    equals(color, new Color(0, 0, 1));
  });

  it('Color#clone()', () => {
    const color = new Color(0, 0, 0);
    equals(function () {
      return color.clone() != color;
    }, true);

    equals(function () {
      return new Color(color) != color;
    }, true);
  });

  it('Color#convert()', () => {
    const color = new Color(0, 0, 0);
    const converted = color.convert('rgb');
    equals(function () {
      return converted !== color;
    }, true);
    equals(function () {
      return converted.equals(color);
    }, true);
  });

  it('Getting saturation from black RGB Color', () => {
    equals(function () {
      return new Color(0, 0, 0).saturation === 0;
    }, true);
  });

  it('Color#add()', () => {
    const color = new Color(0, 1, 1);
    equals(color.add([1, 0, 0]), new Color([1, 1, 1]));
    equals(color.add([1, 0.5, 0]), new Color([1, 1.5, 1]));

    const color2 = new Color(0, 0.5, 0);
    equals(color2.add(0.5), new Color([0.5, 1, 0.5]));
  });

  it('Color#subtract()', () => {
    const color = new Color(0, 1, 1);
    equals(color.subtract([0, 1, 1]), new Color([0, 0, 0]));
    equals(color.subtract([0, 0.5, 1]), new Color([0, 0.5, 0]));

    const color2 = new Color(1, 1, 1);
    equals(color2.subtract(0.5), new Color([0.5, 0.5, 0.5]));
  });

  it('Color#multiply()', () => {
    const color = new Color(1, 0.5, 0.25);
    equals(color.multiply([0.25, 0.5, 1]), new Color([0.25, 0.25, 0.25]));

    const color2 = new Color(1, 1, 1);
    equals(color2.multiply(0.5), new Color([0.5, 0.5, 0.5]));

    const color3 = new Color(0.5, 0.5, 0.5);
    equals(color3.multiply(2), new Color([1, 1, 1]));
  });

  it('Color#divide()', () => {
    const color = new Color(1, 1, 1);
    equals(color.divide([1, 2, 4]), new Color([1, 0.5, 0.25]));

    const color2 = new Color(1, 0.5, 0.25);
    equals(color2.divide(0.25), new Color([4, 2, 1]));

    const color3 = new Color(1, 1, 1);
    equals(color3.divide(4), new Color([0.25, 0.25, 0.25]));
  });

  it('Color#equals()', () => {
    const red = new Color('red');
    equals(function () {
      return new Color(1, 0, 0).equals(red);
    }, true);
    equals(function () {
      return new Color(1, 0, 0, 1).equals(red);
    }, true);
  });

  it('Gradient', () => {
    const stop1 = new GradientStop({ offset: 0.5 });
    const stop2 = new GradientStop('red', 0.75);
    const stop3 = new GradientStop(['white', 1]);
    const stop4 = new GradientStop({ rampPoint: 0.5 }); // deprecated
    new Gradient([stop1, stop2, stop3], true);

    equals(
      function () {
        return stop1.color;
      },
      new Color(0, 0, 0)
    );
    equals(
      function () {
        return stop2.color;
      },
      new Color(1, 0, 0)
    );
    equals(
      function () {
        return stop3.color;
      },
      new Color(1, 1, 1)
    );
    equals(
      function () {
        return stop4.color;
      },
      new Color(0, 0, 0)
    );
    equals(function () {
      return stop1.offset;
    }, 0.5);
    equals(function () {
      return stop2.offset;
    }, 0.75);
    equals(function () {
      return stop3.offset;
    }, 1);
    equals(function () {
      return stop4.offset;
    }, 0.5);
  });

  // TODO: need to port over the "comparePixels" function
  it.skip('Gradients with applyMatrix', () => {
    const topLeft = [100, 100];
    const bottomRight = [400, 400];
    const gradientColor = {
      gradient: {
        stops: ['yellow', 'red', 'blue'],
      },
      origin: topLeft,
      destination: bottomRight,
    };

    const path = new Path.Rectangle({
      topLeft: topLeft,
      bottomRight: bottomRight,
      fillColor: gradientColor,
      applyMatrix: true,
    });

    const shape = new Shape.Rectangle({
      topLeft: topLeft,
      bottomRight: bottomRight,
      fillColor: gradientColor,
      applyMatrix: false,
    });

    comparePixels(path, shape);

    path.scale(2);
    path.rotate(45);
    shape.scale(2);
    shape.rotate(45);

    comparePixels(path, shape);
  });

  it('Modifying group.strokeColor for multiple children', () => {
    const item = new Group(new Path(), new Path());
    item.strokeColor = 'red';
    // const strokeColor = item.strokeColor;
    item.strokeColor.hue = 50;
    equals(function () {
      return item.strokeColor !== undefined;
    }, true);
  });
});
