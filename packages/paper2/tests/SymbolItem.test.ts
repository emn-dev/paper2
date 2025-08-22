import { describe, it } from 'vitest';
import { paper, Path, Rectangle, SymbolDefinition, SymbolItem, Point, Group } from '~/index-core';
import { equals } from './_helpers';

describe('Given: SymbolItem', () => {
  it('SymbolItem#bounds', () => {
    const path = new Path.Circle([50, 50], 50);
    path.strokeColor = 'black';
    path.strokeWidth = 1;
    path.strokeCap = 'round';
    path.strokeJoin = 'round';
    equals(path.strokeBounds, new Rectangle(-0.5, -0.5, 101, 101), 'Path initial bounds');
    const definition = new SymbolDefinition(path);
    const item = new SymbolItem(definition);

    equals(item.bounds, new Rectangle(-50.5, -50.5, 101, 101), 'SymbolItem initial bounds');

    item.scale(1, 0.5);
    equals(item.bounds, new Rectangle(-50.5, -25.25, 101, 50.5), 'Bounds after scale');

    item.rotate(40);
    equals(item.bounds, new Rectangle(-41.96283, -37.79252, 83.92567, 75.58503), 'Bounds after rotation');
  });

  it('bounds of group of SymbolItem instances', () => {
    const path = new Path.Circle(new Point(), 10);
    const definition = new SymbolDefinition(path);
    const instances = [];
    for (let i = 0; i < 10; i++) {
      const instance = definition.place(new Point(i * 20, 20));
      instances.push(instance);
    }
    const group = new Group(instances);
    equals(group.bounds, new Rectangle(-10, 10, 200, 20), 'Group bounds');
  });

  it('bounds of a SymbolItem that contains a group of items', () => {
    const path = new Path.Circle(new Point(), 10);
    const path2 = path.clone();
    path2.position.x += 20;
    equals(path.bounds, new Rectangle(-10, -10, 20, 20), 'path bounds');
    equals(path2.bounds, new Rectangle(10, -10, 20, 20), 'path2 bounds');
    const group = new Group(path, path2);
    equals(group.bounds, new Rectangle(-10, -10, 40, 20), 'Group bounds');
    const definition = new SymbolDefinition(group);
    const instance = definition.place(new Point(50, 50));
    equals(instance.bounds, new Rectangle(30, 40, 40, 20), 'Instance bounds');
  });

  it('Changing the definition of a symbol should change the bounds of all instances of it.', () => {
    const path = new Path.Circle(new Point(), 10);
    const path2 = new Path.Circle(new Point(), 20);
    const definition = new SymbolDefinition(path);
    const instance = definition.place(new Point(0, 0));
    equals(instance.bounds, new Rectangle(-10, -10, 20, 20), 'Initial bounds');
    definition.item = path2;
    equals(instance.bounds, new Rectangle(-20, -20, 40, 40), 'Bounds after changing symbol definition');
    definition.item.scale(0.5, 0.5);
    equals(instance.bounds, new Rectangle(-10, -10, 20, 20), 'Bounds after modifying symbol definition');
  });

  it('SymbolDefinition item selection', () => {
    const path = new Path.Circle([50, 50], 50);
    path.selected = true;
    const definition = new SymbolDefinition(path);
    equals(function () {
      return definition.item.selected == false;
    }, true);
    equals(function () {
      return paper.project.selectedItems.length === 0;
    }, true);
  });

  it('SymbolDefinition#place()', () => {
    const path = new Path.Circle([50, 50], 50);
    const symbol = new SymbolDefinition(path);
    const placed = symbol.place();
    equals(function () {
      return placed.parent == paper.project.activeLayer;
    }, true);

    equals(function () {
      return placed.definition == symbol;
    }, true);

    equals(function () {
      return placed.position.toString();
    }, '{ x: 0, y: 0 }');
  });

  it('SymbolDefinition#place(position)', () => {
    const path = new Path.Circle([50, 50], 50);
    const symbol = new SymbolDefinition(path);
    const placed = symbol.place(new Point(100, 100));
    equals(function () {
      return placed.position.toString();
    }, '{ x: 100, y: 100 }');
  });

  it('SymbolItem#bounds with #applyMatrix = false', () => {
    const path = new Path.Rectangle({
      point: [100, 100],
      size: [50, 50],
      strokeColor: 'red',
      applyMatrix: false,
      strokeWidth: 50,
    });
    const symbol = new SymbolDefinition(path);
    const placed = symbol.place([200, 200]);
    equals(
      function () {
        return placed.bounds;
      },
      { x: 150, y: 150, width: 100, height: 100 }
    );
  });

  it('SymbolItem#hitTestAll', () => {
    const symbol = new SymbolDefinition(
      new Path.Circle({
        center: [0, 0],
        radius: 10,
        fillColor: 'orange',
      })
    );
    const symbolItem = symbol.place([50, 50]);

    const hitTestAll = symbolItem.hitTestAll([50, 50]);
    equals(hitTestAll.length, 1);
    equals(hitTestAll[0].item.id, symbolItem.id);
  });
});
