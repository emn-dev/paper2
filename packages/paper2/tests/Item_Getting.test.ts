import { describe, it } from 'vitest';
import { Path, Group, Item, Layer, paper, Raster } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Getting and Matching Items', () => {
  it('Item#getItems()', () => {
    const group = new Group([new Path({ selected: true }), new Raster()]);
    equals(function () {
      return group.getItems({
        type: 'path',
      }).length;
    }, 1);

    equals(function () {
      return group.getItems({
        selected: true,
      }).length;
    }, 1);
  });

  it('Item#matches()', () => {
    const path = new Path();
    equals(function () {
      return path.matches({
        visible: false,
      });
    }, false);

    equals(function () {
      return path.matches({
        visible: true,
      });
    }, true);
  });

  it('Project#getItems()', () => {
    const layer = new Layer();

    let matches = paper.project.getItems({
      class: Layer,
    });
    equals(function () {
      return matches.length == 1 && matches[0] == layer;
    }, true);

    matches = paper.project.getItems({
      class: Item,
    });
    equals(function () {
      return matches.length == 1 && matches[0] == layer;
    }, true);

    const path = new Path();
    matches = paper.project.getItems({
      class: Path,
    });
    equals(function () {
      return matches.length == 1 && matches[0] == path;
    }, true);

    const group = new Group();
    matches = paper.project.getItems({
      className: 'Group',
    });
    equals(function () {
      return matches.length == 1 && matches[0] === group;
    }, true);

    matches = paper.project.getItems({
      type: 'group',
    });
    equals(function () {
      return matches.length == 1 && matches[0] === group;
    }, true);

    const raster = new Raster();
    matches = paper.project.getItems({
      class: Raster,
    });
    equals(function () {
      return matches.length == 1 && matches[0] === raster;
    }, true);

    equals(function () {
      return paper.project.getItems({
        selected: true,
      }).length;
    }, 0);

    raster.selected = true;
    equals(function () {
      return paper.project.getItems({
        selected: true,
      }).length;
    }, 2);

    raster.selected = true;
    equals(function () {
      return paper.project.getItems({
        selected: true,
        class: Raster,
      }).length;
    }, 1);
  });

  it('Project#getItems() with compare function', () => {
    new Path();
    const path = new Path({
      opacity: 0.5,
    });

    const items = paper.project.getItems({
      opacity: function (value) {
        return value < 1;
      },
    });
    equals(function () {
      return items.length == 1 && items[0] == path;
    }, true);
  });

  it('Project#getItems() with specific property value', () => {
    const path = new Path();
    new Path({
      opacity: 0.5,
    });

    const items = paper.project.getItems({
      opacity: 1,
      type: 'path',
    });
    equals(function () {
      return items.length == 1 && items[0] == path;
    }, true);
  });

  it('Project#getItems() with color', () => {
    const path = new Path({
      fillColor: 'red',
    });

    new Path({
      fillColor: 'black',
    });

    const items = paper.project.getItems({
      fillColor: 'red',
      type: 'path',
    });
    equals(function () {
      return items.length == 1 && items[0] == path;
    }, true);
  });

  it('Project#getItems() with regex function', () => {
    paper.project.activeLayer;
    new Path({
      name: 'stop',
    });

    new Path({
      name: 'pause',
    });

    const startPath = new Path({
      name: 'starting',
    });

    const items = paper.project.getItems({
      name: /^start/g,
    });

    // console.log(paper.project.activeLayer);
    equals(function () {
      return items.length == 1 && items[0] == startPath;
    }, true);

    equals(function () {
      const items = paper.project.getItems({
        name: /^st/g,
      });
      return items.length == 2;
    }, true);
  });

  it('Project#getItems() empty: true', () => {
    const layer = new Layer();
    new Path();
    new Path();

    equals(function () {
      return layer.children.length;
    }, 2);

    equals(function () {
      return paper.project.getItems({
        empty: true,
      }).length;
    }, 2);
  });

  it('Project#getItems() overlapping', () => {
    const path = new Path.Circle({
      radius: 100,
      center: [200, 200],
      fillColor: 'red',
    });

    equals(function () {
      const matches = paper.project.getItems({
        class: Path,
        overlapping: [0, 0, 400, 400],
      });
      return matches.length == 1 && matches[0] == path;
    }, true);

    equals(function () {
      const matches = paper.project.getItems({
        class: Path,
        overlapping: [200, 0, 400, 400],
      });
      return matches.length == 1 && matches[0] == path;
    }, true);

    equals(function () {
      const matches = paper.project.getItems({
        class: Path,
        overlapping: [400, 0, 400, 400],
      });
      return matches.length == 0;
    }, true);
  });

  it('Project#getItems() inside', () => {
    const path = new Path.Circle({
      radius: 100,
      center: [200, 200],
      fillColor: 'red',
    });

    equals(function () {
      const matches = paper.project.getItems({
        class: Path,
        inside: [0, 0, 400, 400],
      });
      return matches.length == 1 && matches[0] == path;
    }, true);

    equals(function () {
      const matches = paper.project.getItems({
        class: Path,
        inside: [200, 0, 400, 400],
      });
      return matches.length == 0;
    }, true);
  });
});
