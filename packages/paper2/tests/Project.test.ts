import { describe, it } from 'vitest';
import { Project, Path, Layer } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Project', () => {
  it('activate()', () => {
    const project = new Project();
    const secondDoc = new Project();
    project.activate();
    const path = new Path();
    equals(function () {
      return project.activeLayer.children[0] == path;
    }, true);
    equals(function () {
      return secondDoc.activeLayer.children.length == 0;
    }, true);
  });

  it('clear()', () => {
    const project = new Project();
    new Layer();
    new Layer();
    new Layer();
    equals(project.layers.length, 3);
    project.clear();
    equals(project.layers.length, 0);
  });
});
