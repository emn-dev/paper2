// import { ref } from './globals';
import { Base } from './straps';
import './item/ChangeFlag';
import './item/ItemSelection';
import './path/SegmentSelection';
import { Numerical } from './util/Numerical';
// import { HTMLCanvasElement_getContext_mock } from './canvas/canvas-mocks';
import './core/Base';

export * from './core/Emitter';

import { PaperScope as PaperScopeModule } from './core/PaperScope';

export const PaperScope = PaperScopeModule;
export * from './core/PaperScopeItem';
export * from './util/CollisionDetection';
export * from './util/Formatter';
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

import { SymbolItem as SymbolItemModule } from './item/SymbolItem';

export const SymbolItem = SymbolItemModule;

import { SymbolDefinition as SymbolDefinitionModule } from './item/SymbolDefinition';

export const SymbolDefinition = SymbolDefinitionModule;
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
  document: globalThis.document,
  window: globalThis.window,
  globalThis,
  // TODO: Remove in 1.0.0? (deprecated January 2016):
  Symbol: SymbolDefinition,
  PlacedSymbol: SymbolItem,
}))();
