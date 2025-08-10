import './item/ChangeFlag';
import './item/ItemSelection';
import './path/SegmentSelection';

// /*#*/ include('init.js');
// Inline Straps.js core (the Base class) inside the paper scope first:
// /*#*/ include('../node_modules/straps/straps.js');
import { Base } from './straps';

// /*#*/ include('core/Base.js');
// /*#*/ include('core/Emitter.js');
// /*#*/ include('core/PaperScope.js');
// /*#*/ include('core/PaperScopeItem.js');
import './core/Base';
import './core/Emitter';
import { PaperScope } from './core/PaperScope';
import './core/PaperScopeItem';

// /*#*/ include('util/CollisionDetection.js');
// /*#*/ include('util/Formatter.js');
// /*#*/ include('util/Numerical.js');
// /*#*/ include('util/UID.js');
import './util/CollisionDetection';
import './util/Formatter';
import { Numerical } from './util/Numerical';
import './util/UID';

// Include Paper classes, which are later injected into PaperScope by setting
// them on the 'this' object, e.g.:
// var Point = Base.extend(...);

// /*#*/ include('basic/Point.js');
// /*#*/ include('basic/Size.js');
// /*#*/ include('basic/Rectangle.js');
// /*#*/ include('basic/Matrix.js');
// /*#*/ include('basic/Line.js');
import './basic/Point';
import './basic/Size';
import './basic/Rectangle';
import './basic/Matrix';
import './basic/Line';

// /*#*/ include('item/Project.js');
// /*#*/ include('item/Item.js');
// /*#*/ include('item/Group.js');
// /*#*/ include('item/Layer.js');
// /*#*/ include('item/Shape.js');
// /*#*/ include('item/Raster.js');
// /*#*/ include('item/SymbolItem.js');
// /*#*/ include('item/SymbolDefinition.js');
// /*#*/ include('item/HitResult.js');
import './item/Project';
import './item/Item';
import './item/Group';
import './item/Layer';
import './item/Shape';
import './item/Raster';
import { SymbolItem } from './item/SymbolItem';
import { SymbolDefinition } from './item/SymbolDefinition';
import './item/HitResult';

// /*#*/ include('path/Segment.js');
// /*#*/ include('path/SegmentPoint.js');
// /*#*/ include('path/Curve.js');
// /*#*/ include('path/CurveLocation.js');
// /*#*/ include('path/PathItem.js');
// /*#*/ include('path/Path.js');
// /*#*/ include('path/Path.Constructors.js');
// /*#*/ include('path/CompoundPath.js');
// /*#*/ if (__options.booleanOperations) {
// /*#*/     include('path/PathItem.Boolean.js');
// /*#*/ }
// /*#*/ include('path/PathFlattener.js');
// /*#*/ include('path/PathFitter.js');
import './path/Segment';
import './path/SegmentPoint';
import './path/Curve';
import './path/CurveLocation';
import './path/PathItem';
import './path/Path';
import './path/Path.Constructors';
import './path/CompoundPath';
import './path/PathItem.Boolean';
import './path/PathFlattener';
import './path/PathFitter';

// /*#*/ include('text/TextItem.js');
// /*#*/ include('text/PointText.js');
import './text/TextItem';
import './text/PointText';

// /*#*/ include('style/Color.js');
// /*#*/ include('style/Gradient.js');
// /*#*/ include('style/GradientStop.js');
// /*#*/ include('style/Style.js');
import './style/Color';
import './style/Gradient';
import './style/GradientStop';
import './style/Style';

// /*#*/ include('dom/DomElement.js');
// /*#*/ include('dom/DomEvent.js');
import { DomElement } from './dom/DomElement';
import { DomEvent } from './dom/DomEvent';

// /*#*/ include('view/View.js');
// /*#*/ include('view/CanvasView.js');
import './view/View';
import './view/CanvasView';

// /*#*/ include('event/Event.js');
// /*#*/ include('event/KeyEvent.js');
// /*#*/ include('event/Key.js');
// /*#*/ include('event/MouseEvent.js');
import { Key } from './event/Key'; // NOTE: Changed order
import './event/Event';
import './event/KeyEvent';
import './event/MouseEvent';

// /*#*/ include('tool/ToolEvent.js');
// /*#*/ include('tool/Tool.js');
import './tool/ToolEvent';
import './tool/Tool';

// /*#*/ include('anim/Tween.js');
import './anim/Tween';

// /*#*/ include('net/Http.js');
import './net/Http';

// /*#*/ include('canvas/CanvasProvider.js');
// /*#*/ include('canvas/BlendMode.js');
// /*#*/ if (__options.load) {
// /*#*/     include('canvas/ProxyContext.js');
// /*#*/ }
import './canvas/CanvasProvider';
import './canvas/BlendMode';

import './core/PaperScript';

export { Base as straps } from './straps';

export const paper = new (PaperScope.inject(Base.exports, {
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
