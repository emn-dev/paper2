import { describe, it } from 'vitest';
import { Path, PathItem, Point, CompoundPath } from '~/index-core';
import { compareBoolean } from './_helpers';

describe('Given: Path Boolean Operations', () => {
  function testOperations(path1, path2, results) {
    compareBoolean(function () {
      return path1.unite(path2);
    }, results[0]);
    compareBoolean(function () {
      return path2.unite(path1);
    }, results[0]);
    compareBoolean(function () {
      return path1.subtract(path2);
    }, results[1]);
    compareBoolean(function () {
      return path2.subtract(path1);
    }, results[2]);
    compareBoolean(function () {
      return path1.intersect(path2);
    }, results[3]);
    compareBoolean(function () {
      return path2.intersect(path1);
    }, results[3]);
    compareBoolean(function () {
      return path1.exclude(path2);
    }, results[4]);
    compareBoolean(function () {
      return path2.exclude(path1);
    }, results[4]);
  }

  it('Boolean operations without crossings', () => {
    const path1 = new Path.Rectangle({
      point: [0, 0],
      size: [200, 200],
    });

    const path2 = new Path.Rectangle({
      point: [50, 50],
      size: [100, 100],
    });

    const path3 = new Path.Rectangle({
      point: [250, 50],
      size: [100, 100],
    });

    testOperations(path1, path2, [
      'M0,200v-200h200v200z', // path1.unite(path2);
      'M0,200v-200h200v200zM150,150v-100h-100v100z', // path1.subtract(path2);
      '', // path2.subtract(path1);
      'M50,150v-100h100v100z', // path1.intersect(path2);
      'M0,200v-200h200v200zM150,150v-100h-100v100z', // path1.exclude(path2);
    ]);

    testOperations(path1, path3, [
      'M0,200v-200h200v200zM250,150v-100h100v100z', // path1.unite(path3);
      'M0,200v-200h200v200z', // path1.subtract(path3);
      'M350,150v-100h-100v100z', // path3.subtract(path1);
      '', // path1.intersect(path3);
      'M0,200v-200h200v200zM250,150v-100h100v100z', // path1.exclude(path3);
    ]);
  });

  it('frame.intersect(rect)', () => {
    const frame = new CompoundPath();
    frame.addChild(new Path.Rectangle(new Point(140, 10), [100, 300]));
    frame.addChild(new Path.Rectangle(new Point(150, 80), [50, 80]));
    const rect = new Path.Rectangle(new Point(50, 50), [100, 150]);

    compareBoolean(function () {
      return frame.intersect(rect);
    }, 'M140,50l10,0l0,150l-10,0z');
  });

  it('PathItem#resolveCrossings()', () => {
    const paths = [
      'M100,300l0,-50l50,-50l-50,0l150,0l-150,0l50,0l-50,0l100,0l-100,0l0,-100l200,0l0,200z',
      'M50,300l0,-150l50,25l0,-75l200,0l0,200z M100,200l50,0l-50,-25z',
      'M330.1,388.5l-65,65c0,0 -49.1,-14.5 -36.6,-36.6c12.5,-22.1 92.4,25.1 92.4,25.1c0,0 -33.3,-73.3 -23.2,-85.9c10,-12.8 32.4,32.4 32.4,32.4z',
      'M570,290l5.8176000300452415,33.58556812220928l-28.17314339506561,-14.439003967264455l31.189735425395614,-4.568209255479985c-5.7225406635552645e-9,-3.907138079739525e-8 -59.366611385062015,8.695139599513823 -59.366611385062015,8.695139599513823z',
      'M228.26666666666668,222.72h55.46666666666667c3.05499999999995,0 5.546666666666624,2.4916666666666742 5.546666666666624,5.546666666666681v55.46666666666667c0,3.05499999999995 -2.4916666666666742,5.546666666666624 -5.546666666666624,5.546666666666624h-55.46666666666667c-3.055000000000007,0 -5.546666666666681,-2.4916666666666742 -5.546666666666681,-5.546666666666624v-55.46666666666667c0,-3.055000000000007 2.4916666666666742,-5.546666666666681 5.546666666666681,-5.546666666666681zM283.73333399705655,289.2799999999998c-2.212411231994338e-7,1.1368683772161603e-13 2.212409526691772e-7,0 0,0z',
    ];
    const results = [
      'M100,300l0,-50l50,-50l-50,0l0,-100l200,0l0,200z',
      'M50,300l0,-150l50,25l0,-75l200,0l0,200z M100,200l50,0l-50,-25z',
      'M291.85631,426.74369l-26.75631,26.75631c0,0 -49.1,-14.5 -36.6,-36.6c7.48773,-13.23831 39.16013,-1.61018 63.35631,9.84369z M330.1,388.5l-22.09831,22.09831c-8.06306,-21.54667 -15.93643,-47.46883 -10.30169,-54.49831c10,-12.8 32.4,32.4 32.4,32.4z M320.9,442c0,0 -12.84682,-7.58911 -29.04369,-15.25631l16.14539,-16.14539c6.38959,17.07471 12.89831,31.40169 12.89831,31.40169z',
      'M570,290l5.8176,33.58557l-28.17314,-14.439c-14.32289,2.0978 -28.17688,4.12693 -28.17688,4.12693z',
      'M228.26666666666668,222.72h55.46666666666667c3.05499999999995,0 5.546666666666624,2.4916666666666742 5.546666666666624,5.546666666666681v55.46666666666667c0,3.05499999999995 -2.4916666666666742,5.546666666666624 -5.546666666666624,5.546666666666624h-55.46666666666667c-3.055000000000007,0 -5.546666666666681,-2.4916666666666742 -5.546666666666681,-5.546666666666624v-55.46666666666667c0,-3.055000000000007 2.4916666666666742,-5.546666666666681 5.546666666666681,-5.546666666666681z',
    ];
    for (let i = 0; i < paths.length; i++) {
      const path = PathItem.create(paths[i]);
      const result = PathItem.create(results[i]);
      path.fillRule = 'evenodd';
      compareBoolean(path.resolveCrossings(), result, 'path.resolveCrossings(); // Test ' + (i + 1));
    }
  });

  it('#541', () => {
    const shape0 = new Path.Rectangle({
      insert: false,
      point: [304, 226],
      size: [328, 328],
    });
    const shape1 = new Path({
      insert: false,
      segments: [
        [213.5, 239],
        [476.5, 279],
        [716, 233.5],
        [469, 74],
      ],
      closed: true,
    });
    const res1 = shape0.exclude(shape1);
    const shape2 = new Path.Rectangle({
      insert: false,
      point: [174, 128],
      size: [309, 251],
    });
    const res2 = res1.exclude(shape2);
    // shape3
    const shape3 = new Path.Rectangle({
      insert: false,
      point: [318, 148],
      size: [302, 302],
    });
    // exclude res2 & shape3
    compareBoolean(function () {
      return res2.exclude(shape3);
    }, 'M304,554l0,-175l14,0l0,71l302,0l0,-198.262l12,-2.27975l0,304.54175z M318,379l165,0l0,-101.23486l137,-26.02714l0,-25.738l-137,0l0,-78l-128.58788,0l-36.41212,23.51468l0,54.48532l165,0l0,51.76514l-6.5,1.23486l-158.5,-24.10646z M174,379l0,-251l211.38182,0l-30.9697,20l-36.41212,0l0,23.51468l-104.5,67.48532l90.5,13.76426l0,-26.76426l14,0l0,28.89354l-14,-2.12928l0,126.23574z M385.38182,128l83.61818,-54l114.59561,74l-100.59561,0l0,-20z M583.59561,148l36.40439,23.5081l0,-23.5081z M620,171.5081l96,61.9919l-84,15.95825l0,-23.45825l-12,0z');
  });

  it('#609', () => {
    // path1 and path2 are half circles, applying unite should result in a circle
    const path1 = new Path();
    path1.moveTo(new Point(100, 100));
    path1.arcTo(new Point(100, 200));
    path1.closePath();

    const path2 = new Path();
    path2.moveTo(new Point(100, 200));
    path2.arcTo(new Point(100, 100));
    path2.closePath();

    compareBoolean(function () {
      return path1.unite(path2);
    }, 'M150,150c0,27.61424 -22.38576,50 -50,50c-27.61424,0 -50,-22.38576 -50,-50c0,-27.61424 22.38576,-50 50,-50c27.61424,0 50,22.38576 50,50z');
  });

  it('#610', () => {
    const square = new Path.Rectangle({
      position: [140, 0],
      size: 300,
    });

    // Make a ring using subtraction of two circles:
    const inner = new Path.Circle({
      center: [0, 0],
      radius: 100,
    });

    const outer = new Path.Circle({
      center: [0, 0],
      radius: 132,
    });

    const ring = outer.subtract(inner);

    compareBoolean(function () {
      return ring.subtract(square);
    }, 'M-132,0c0,-69.53737 53.7698,-126.51614 122,-131.62689l0,32.12064c-50.53323,5.01724 -90,47.65277 -90,99.50625c0,51.85348 39.46677,94.489 90,99.50625l0,32.12064c-68.2302,-5.11075 -122,-62.08951 -122,-131.62689z');
  });

  it('#719', () => {
    const radius = 50;
    const circle = new Path.Circle([0, 0], radius);
    const arc = new Path.Arc([0, -radius], [radius, 0], [0, radius]);
    arc.closed = true;
    arc.pivot = arc.bounds.leftCenter;

    const result = circle.subtract(arc);
    // Rotate the arc by 180 to receive the expected shape to compare against
    const expected = arc.rotate(180);

    compareBoolean(result, expected);
  });

  it('#757 (path1.intersect(pat2, { trace: false }))', () => {
    const rect = new Path.Rectangle({
      from: [100, 250],
      to: [350, 350],
    });

    const line = new Path({
      segments: [
        [100, 200],
        [150, 400],
        [200, 200],
        [250, 400],
        [300, 200],
        [350, 400],
      ],
    });

    let res = line.intersect(rect, { trace: false });

    const children = res.removeChildren();
    const first = children[0];
    for (let i = 1; i < children.length; i++) {
      first.join(children[i]);
    }
    first.insertAbove(res);
    res.remove();
    res = first;
    compareBoolean(res, 'M112.5,250l25,100l25,0l25,-100l25,0l25,100l25,0l25,-100l25,0l25,100');
  });

  it('#784', () => {
    const path1 = PathItem.create(
      'M495.9,1693.5c-42.2-203.5-64.5-304.9-78-299.9 c-1.7,0.6-0.3,6.7,5.3,22.5l209.4-74.8l75.8,303.9L495.9,1693.5z'
    );
    const path2 = PathItem.create('M632.6,1341.2l-209.4,74.9c95.4,267,135.6,201-60.1-144.5l202.9-85.7 L632.6,1341.2z');
    compareBoolean(function () {
      return path1.unite(path2);
    }, 'M495.9,1693.5c-17.51923,-84.48253 -31.60874,-151.36838 -43.06274,-200.34989c-9.02339,-21.58227 -18.9863,-47.24083 -29.63726,-77.05011c-5.6,-15.8 -7,-21.9 -5.3,-22.5c3.68921,-1.36638 8.03561,5.21313 13.26571,19.65076l6.17555,-2.20892c0.00094,0.00191 0.00189,0.00383 0.00283,0.00574l195.25591,-69.74757l75.8,303.9z M632.6,1341.2l-195.25874,69.84183c-19.60056,-39.73292 -44.12819,-86.27851 -74.24126,-139.44183l202.9,-85.7z');

    const path1b = new Path(
      'M330.1,388.5l-65,65c0,0-49.1-14.5-36.6-36.6 c12.5-22.1,92.4,25.1,92.4,25.1s-33.3-73.3-23.2-85.9C307.7,343.3,330.1,388.5,330.1,388.5z'
    );
    const path2b = new Path(
      'M395.1,453.4c0,15.2-33.8,65-65,65s-65-65-65-65l65-65 C330.1,388.5,395.1,438.2,395.1,453.4z'
    );
    compareBoolean(function () {
      return path1b.unite(path2b);
    }, 'M265.13434,453.46566l-0.03434,0.03434c0,0 -49.1,-14.5 -36.6,-36.6c7.48073,-13.22593 39.10093,-1.6319 63.28843,9.81157l16.18604,-16.18604c-8.05354,-21.53223 -15.90287,-47.40397 -10.27447,-54.42553c9.77623,-12.51358 31.40373,30.40618 32.36674,32.33326l0.03326,-0.03326c0,0.1 65,49.8 65,65c0,15.2 -33.8,65 -65,65c-30.62393,0 -63.75273,-62.62185 -64.96566,-64.93434z');
  });

  it('#784#issuecomment-144653463', () => {
    const path1 = new Path({
      segments: [
        [400, 300],
        [396.4240965757225, 386.760212367686],
        [363.8902430603039, 336.3464406833805],
      ],
      closed: true,
    });
    const path2 = new Path({
      segments: [
        [380.15716053320796, 361.5533174872367],
        [368.9579765078272, 389.3845783631412],
        [352.11749924000907, 372.22000125020173],
      ],
      closed: true,
    });
    const path3 = new Path({
      segments: [
        [381.9248139754118, 360.88087710036456],
        [352.11749931845384, 372.22000145641056],
        [353.8723170322086, 346.9400510828104],
      ],
      closed: true,
    });
    compareBoolean(function () {
      return path1.unite(path2).unite(path3);
    }, 'M400,300l-3.5759,86.76021l-16.26693,-25.2069l0,0l-11.19918,27.83126l-16.84048,-17.16458l1.75482,-25.27995l24.8115,12.3302l-14.79357,-22.92381z M352.1175,372.22z');
  });

  it('#784#issuecomment-144993215', () => {
    const path1 = new Path({
      segments: [
        [428.65986693122585, 123.24312916360232],
        [
          448.9732353341095, 290.23336023178985, -1.297313778199964, -0.24666929481787747, -0.06896642337790126,
          -0.004714867204086204,
        ],
        [
          448.9732339473677, 290.2333601369859, 0.22704183013848933, 0.04316939284507271, 0.24127512029406262,
          0.016494695478172616,
        ],
        [375.34013306877415, 150.7568708363977],
      ],
      closed: true,
    });
    compareBoolean(
      function () {
        return path1.unite();
      },
      'M428.65987,123.24313c0,0 18.24445,159.97772 20.21157,166.76806c-3.05664,-6.18082 -73.53131,-139.25432 -73.53131,-139.25432z M448.97323,290.23336c0,0 0,0 0,0c0.22704,0.04317 -0.06896,-0.00471 0,0c-0.02659,-0.00506 -0.06063,-0.08007 -0.1018,-0.22217c0.07286,0.14733 0.10741,0.22256 0.1018,0.22217z',
      null,
      { tolerance: 1e-3 }
    );
  });

  it('#784#issuecomment-168605018', () => {
    const path1 = new CompoundPath();
    path1.setChildren(
      [
        new Path({
          segments: [
            [401.77542835664826, 286.9803609495646],
            [410.6261525310172, 207.97354059345616],
            [460.3783408790767, 174.43669899386418],
          ],
          closed: true,
        }),
        new Path({
          segments: [
            [410.6261524612045, 207.9735406405153],
            [410.6261525310172, 207.97354059345614, -0.0005059167983745283, -0.0007686158121771314],
          ],
          closed: true,
        }),
      ],
      true
    );
    const path2 = new Path({
      segments: [
        [410.6261524612047, 207.97354064051552, 0, 0, 0.19904749518872222, 0.2952886437272184],
        [409.163896522797, 207.2586618457598, 1.6828473498011363, 0.6114523237241087],
        [460.3783408790765, 174.43669899386396],
      ],
      closed: true,
    });
    compareBoolean(function () {
      return path1.unite(path2);
    }, 'M401.77543,286.98036l8.85044,-79.00432c-0.16499,-0.13413 -0.57872,-0.39645 -1.46198,-0.71738l51.21444,-32.82196z M410.62615,207.97354c0,0 0,0 0,0z');
  });
});
