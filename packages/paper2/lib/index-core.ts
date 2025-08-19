import { ref } from './globals';
import { Base } from './straps';
import './item/ChangeFlag';
import './item/ItemSelection';
import './path/SegmentSelection';
import { HTMLCanvasElement_getContext_mock } from './canvas/canvas-mocks';

// /*#*/ include('init.js.js');
// Inline Straps.js core (the Base class) inside the paper scope first:
// /*#*/ include('../node_modules/straps/straps.js.js');
// const { Base } = await import('./straps.js');

async function allImports() {
  // /*#*/ include('core/Base.js.js');
  // /*#*/ include('core/Emitter.js.js');
  // /*#*/ include('core/PaperScope.js.js');
  // /*#*/ include('core/PaperScopeItem.js.js');
  await import('./core/Base.js');
  await import('./core/Emitter.js');
  const { PaperScope } = await import('./core/PaperScope.js');
  await import('./core/PaperScopeItem.js');

  // /*#*/ include('util/CollisionDetection.js.js');
  // /*#*/ include('util/Formatter.js.js');
  // /*#*/ include('util/Numerical.js.js');
  // /*#*/ include('util/UID.js.js');
  await import('./util/CollisionDetection.js');
  await import('./util/Formatter.js');
  const { Numerical } = await import('./util/Numerical.js');
  await import('./util/UID.js');

  // Include Paper classes, which are later injected into PaperScope by setting
  // them on the 'this' object, e.g.:
  // var Point = Base.extend(...);

  // /*#*/ include('basic/Point.js.js');
  // /*#*/ include('basic/Size.js.js');
  // /*#*/ include('basic/Rectangle.js.js');
  // /*#*/ include('basic/Matrix.js.js');
  // /*#*/ include('basic/Line.js.js');
  await import('./basic/Point.js');
  await import('./basic/Size.js');
  await import('./basic/Rectangle.js');
  await import('./basic/Matrix.js');
  await import('./basic/Line.js');

  // /*#*/ include('item/Project.js.js');
  // /*#*/ include('item/Item.js.js');
  // /*#*/ include('item/Group.js.js');
  // /*#*/ include('item/Layer.js.js');
  // /*#*/ include('item/Shape.js.js');
  // /*#*/ include('item/Raster.js.js');
  // /*#*/ include('item/SymbolItem.js.js');
  // /*#*/ include('item/SymbolDefinition.js.js');
  // /*#*/ include('item/HitResult.js.js');
  await import('./item/Project.js');
  await import('./item/Item.js');
  await import('./item/Group.js');
  await import('./item/Layer.js');
  await import('./item/Shape.js');
  await import('./item/Raster.js');
  const { SymbolItem } = await import('./item/SymbolItem.js');
  const { SymbolDefinition } = await import('./item/SymbolDefinition.js');
  await import('./item/HitResult.js');

  // /*#*/ include('path/Segment.js.js');
  // /*#*/ include('path/SegmentPoint.js.js');
  // /*#*/ include('path/Curve.js.js');
  // /*#*/ include('path/CurveLocation.js.js');
  // /*#*/ include('path/PathItem.js.js');
  // /*#*/ include('path/Path.js.js');
  // /*#*/ include('path/Path.Constructors.js.js');
  // /*#*/ include('path/CompoundPath.js.js');
  // /*#*/ if (__options.booleanOperations) {
  // /*#*/     include('path/PathItem.Boolean.js.js');
  // /*#*/ }
  // /*#*/ include('path/PathFlattener.js.js');
  // /*#*/ include('path/PathFitter.js.js');
  await import('./path/Segment.js');
  await import('./path/SegmentPoint.js');
  await import('./path/Curve.js');
  await import('./path/CurveLocation.js');
  await import('./path/PathItem.js');
  await import('./path/Path.js');
  await import('./path/Path.Constructors.js');
  await import('./path/CompoundPath.js');
  await import('./path/PathItem.Boolean.js');
  await import('./path/PathFlattener.js');
  await import('./path/PathFitter.js');

  // /*#*/ include('text/TextItem.js.js');
  // /*#*/ include('text/PointText.js.js');
  await import('./text/TextItem.js');
  await import('./text/PointText.js');

  // /*#*/ include('style/Color.js.js');
  // /*#*/ include('style/Gradient.js.js');
  // /*#*/ include('style/GradientStop.js.js');
  // /*#*/ include('style/Style.js.js');
  await import('./style/Color.js');
  await import('./style/Gradient.js');
  await import('./style/GradientStop.js');
  await import('./style/Style.js');

  // /*#*/ include('dom/DomElement.js.js');
  // /*#*/ include('dom/DomEvent.js.js');
  const { DomElement } = await import('./dom/DomElement.js');
  const { DomEvent } = await import('./dom/DomEvent.js');

  // /*#*/ include('view/View.js.js');
  // /*#*/ include('view/CanvasView.js.js');
  await import('./view/View.js');
  await import('./view/CanvasView.js');

  // /*#*/ include('event/Event.js.js');
  // /*#*/ include('event/KeyEvent.js.js');
  // /*#*/ include('event/Key.js.js');
  // /*#*/ include('event/MouseEvent.js.js');
  const { Key } = await import('./event/Key.js'); // NOTE: Changed order
  await import('./event/Event.js');
  await import('./event/KeyEvent.js');
  await import('./event/MouseEvent.js');

  // /*#*/ include('tool/ToolEvent.js.js');
  // /*#*/ include('tool/Tool.js.js');
  await import('./tool/ToolEvent.js');
  await import('./tool/Tool.js');

  // /*#*/ include('anim/Tween.js.js');
  await import('./anim/Tween.js');

  // /*#*/ include('net/Http.js.js');
  await import('./net/Http.js');

  // /*#*/ include('canvas/CanvasProvider.js.js');
  // /*#*/ include('canvas/BlendMode.js.js');
  // /*#*/ if (__options.load) {
  // /*#*/     include('canvas/ProxyContext.js.js');
  // /*#*/ }
  await import('./canvas/CanvasProvider.js');
  await import('./canvas/BlendMode.js');
  // await import('./canvas/ProxyContext.js'); // I do not know how to use this?

  // /*#*/ if (__options.svg) {
  // /*#*/     include('svg/SvgElement.js.js');
  // /*#*/     include('svg/SvgStyles.js.js');
  // /*#*/     include('svg/SvgExport.js.js');
  // /*#*/     include('svg/SvgImport.js.js');
  // /*#*/ }
  await import('./svg/SvgElement.js');
  await import('./svg/SvgStyles.js');
  await import('./svg/SvgExport.js');
  await import('./svg/SvgImport.js');

  // /*#*/ if (__options.paperScript) {
  // /*#*/     include('core/PaperScript.js.js');
  // /*#*/ }
  // await import('./core/PaperScript.js'); // Do NOT use for paper2-core

  // export { Base as straps } from './straps.js');

  const paper = new (PaperScope.inject(Base.exports, {
    Base,
    Numerical,
    Key,
    DomEvent,
    DomElement,
    // Export jsdom document and window too, for Node.js
    document,
    window,
    // TODO: Remove in 1.0.0? (deprecated January 2016):
    Symbol: SymbolDefinition,
    PlacedSymbol: SymbolItem,
  }))();

  ref.paper = paper;
}

export async function initialize() {
  if (typeof window !== 'undefined') {
    await allImports();
    return { paper: ref.paper, env: 'browser', jsdom: false, nodeCanvas: false };
  }

  // Now we know that we are in nodejs-land (e.g. we can reference 'global')

  let jsdom = null;
  let nodeCanvas = null;
  try {
    // @ts-ignore
    jsdom = await import('jsdom');
  } catch {
    // do nothing
  }
  try {
    // @ts-ignore
    nodeCanvas = await import('canvas');
  } catch {
    // do nothing
  }

  if (jsdom) {
    const dom = new jsdom.JSDOM('<html><body></body></html>', {
      // Use the current working directory as the document's origin, so
      // requests to local files work correctly with CORS.
      url: 'file://' + process.cwd() + '/',
      includeNodeLocations: true,
      resources: 'usable',
    });
    global.window = dom.window;
    global.document = dom.window.document;
    global.self = dom.window;

    // TODO: would you ever want to use node-canvas and not use jsdom?
    if (!nodeCanvas) {
      // This implements a fake for the HTMLCanvasElement.getContext function. jsdom does not provide one.
      (global.window as any).HTMLCanvasElement.prototype.getContext = HTMLCanvasElement_getContext_mock();
    }
  } else {
    // We can still do operations without the DOM or the Canvas
    global.window = null;
    global.document = null;
    global.self = {
      navigator: {
        userAgent: 'Node.js (' + process.platform + '; U; rv:' + process.version + ')',
      },
    } as any;
  }

  await allImports();
  return {
    paper: ref.paper,
    env: 'node',
    jsdom: !!jsdom,
    nodeCanvas: !!nodeCanvas,
  };
}

export function getBaseExports() {
  return Base.exports;
}
