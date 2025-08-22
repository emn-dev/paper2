import { describe, it } from 'vitest';
import { Item } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Emitter', () => {
  it('on()', () => {
    const emitter = new Item();
    let installed;
    // fake event type registration
    emitter._eventTypes = {
      mousemove: {
        install: function () {
          installed = true;
        },
      },
    };
    equals(function () {
      return !emitter.responds('mousemove');
    }, true);

    emitter.on('mousemove', () => {});
    equals(function () {
      return emitter.responds('mousemove');
    }, true);
    equals(function () {
      return installed;
    }, true);

    // one time installation only
    installed = false;
    emitter.on('mousemove', () => {});
    equals(function () {
      return !installed;
    }, true);

    emitter.on('customUnregistered', () => {});
    equals(function () {
      return emitter.responds('customUnregistered');
    }, true);
  });

  it('off()', () => {
    const emitter = new Item();
    let uninstalled;
    let called = 0;
    const handler = function () {
      called++;
    };
    const handler2 = function () {};

    emitter._eventTypes = {
      mousemove: {
        uninstall: function () {
          uninstalled = true;
        },
      },
    };

    emitter.on('mousemove', handler);
    emitter.on('mousemove', handler2);
    emitter.on('custom', handler);
    emitter.emit('mousemove');
    equals(function () {
      return called == 1;
    }, true);

    emitter.off('mousemove', handler2);
    emitter.emit('mousemove');
    equals(function () {
      return called == 2;
    }, true);
    equals(function () {
      return !uninstalled;
    }, true);

    emitter.off('mousemove', handler);
    emitter.emit('mousemove');
    equals(function () {
      return called == 2;
    }, true);
    equals(function () {
      return uninstalled;
    }, true);

    called = 0;
    emitter.emit('custom');
    equals(function () {
      return called == 1;
    }, true);
    emitter.off('custom', handler);
    emitter.emit('custom');
    equals(function () {
      return called == 1;
    }, true);
  });

  it('emit()', () => {
    const emitter = new Item();
    let called;
    const handler = function (e) {
      called = e;
    };
    // fake event type registration
    emitter._eventTypes = {
      mousemove: {},
    };
    emitter.on('mousemove', handler);
    emitter.on('custom', handler);

    emitter.emit('mousemove', 'mousemove');
    equals(function () {
      return called == 'mousemove';
    }, true);

    emitter.emit('custom', 'custom');
    equals(function () {
      return called == 'custom';
    }, true);
  });
});
