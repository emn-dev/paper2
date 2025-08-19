// import { ref } from './globals';
import { Base } from './straps';
import './item/ChangeFlag';
import './item/ItemSelection';
import './path/SegmentSelection';
// import { HTMLCanvasElement_getContext_mock } from './canvas/canvas-mocks';
import './core/Base';
export * from './core/Emitter';
import { PaperScope as PaperScope2 } from './core/PaperScope';
export const PaperScope = PaperScope2;
export * from './core/PaperScopeItem';
export * from './util/CollisionDetection';
export * from './util/Formatter';
import { Numerical } from './util/Numerical';
export * from './util/UID';
export * from './basic/Point';
export * from './basic/Size';
export * from './basic/Rectangle';
export * from './basic/Matrix';
export * from './basic/Line';
export * from './item/Project';
export * from './item/Item';
export * from './item/Group';
export * from './item/Layer';
export * from './item/Shape';
export * from './item/Raster';
import { SymbolItem as SymbolItem2 } from './item/SymbolItem';
export const SymbolItem = SymbolItem2;
import { SymbolDefinition as SymbolDefinition2 } from './item/SymbolDefinition';
export const SymbolDefinition = SymbolDefinition2;
export * from './item/HitResult';
export * from './path/Segment';
export * from './path/SegmentPoint';
export * from './path/Curve';
export * from './path/CurveLocation';
export * from './path/PathItem';
export * from './path/Path';
export * from './path/Path.Constructors';
export * from './path/CompoundPath';
export * from './path/PathItem.Boolean';
export * from './path/PathFlattener';
export * from './path/PathFitter';
export * from './text/TextItem';
export * from './text/PointText';
export * from './style/Color';
export * from './style/Gradient';
export * from './style/GradientStop';
export * from './style/Style';
import { DomElement } from './dom/DomElement';
import { DomEvent } from './dom/DomEvent';
export * from './view/View';
export * from './view/CanvasView';
import { Key as Key2 } from './event/Key'; // NOTE: Changed order
export const Key = Key2;
export * from './event/Event';
export * from './event/KeyEvent';
export * from './event/MouseEvent';
export * from './tool/ToolEvent';
export * from './tool/Tool';
export * from './anim/Tween';
export * from './net/Http';
export * from './canvas/CanvasProvider';
export * from './canvas/BlendMode';
export * from './svg/SvgElement';
export * from './svg/SvgStyles';
export * from './svg/SvgExport';
export * from './svg/SvgImport';

export const paper = new (PaperScope.inject(Base.exports, {
  Base,
  Numerical,
  Key,
  DomEvent,
  DomElement,
  // Export jsdom document and window too, for Node.js
  document: typeof window === 'undefined' ? null : document,
  window: typeof window === 'undefined' ? null : window,
  // TODO: Remove in 1.0.0? (deprecated January 2016):
  Symbol: SymbolDefinition,
  PlacedSymbol: SymbolItem,
}))();

// ref.paper = paper;
//   return { paper, ...paper.Base.exports };

// We are running in the browser
// if (typeof window !== 'undefined') initializeSync();

// export async function initialize() {
//   if (typeof window !== 'undefined') {
//     //  await allImports();
//     return { paper: ref.paper, env: 'browser', jsdom: false, nodeCanvas: false };
//   }

//   // Now we know that we are in nodejs-land (e.g. we can reference 'global')

//   let jsdom = null;
//   let nodeCanvas = null;
//   try {
//     // @ts-ignore
//     jsdom = await import('jsdom');
//   } catch {
//     // do nothing
//   }
//   try {
//     // @ts-ignore
//     nodeCanvas = await import('canvas');
//   } catch {
//     // do nothing
//   }

//   if (jsdom) {
//     const dom = new jsdom.JSDOM('<html><body></body></html>', {
//       // Use the current working directory as the document's origin, so
//       // requests to local files work correctly with CORS.
//       url: 'file://' + process.cwd() + '/',
//       includeNodeLocations: true,
//       resources: 'usable',
//     });
//     global.window = dom.window;
//     global.document = dom.window.document;
//     global.self = dom.window;

//     // TODO: would you ever want to use node-canvas and not use jsdom?
//     if (!nodeCanvas) {
//       // This implements a fake for the HTMLCanvasElement.getContext function. jsdom does not provide one.
//       (global.window as any).HTMLCanvasElement.prototype.getContext = HTMLCanvasElement_getContext_mock();
//     }
//   } else {
//     // We can still do operations without the DOM or the Canvas
//     global.window = null;
//     global.document = null;
//     global.self = {
//       navigator: {
//         userAgent: 'Node.js (' + process.platform + '; U; rv:' + process.version + ')',
//       },
//     } as any;
//   }

//   // await allImports();
//   return {
//     paper: ref.paper,
//     env: 'node',
//     jsdom: !!jsdom,
//     nodeCanvas: !!nodeCanvas,
//   };
// }
