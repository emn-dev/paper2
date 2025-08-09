// export * from "./options";

import "./item/ChangeFlag";
import "./item/ItemSelection";
import "./path/SegmentSelection";

// /*#*/ include('init.js');
// Inline Straps.js core (the Base class) inside the paper scope first:
// /*#*/ include('../node_modules/straps/straps.js');
import { Base } from "./straps";

// /*#*/ include('core/Base.js');
// /*#*/ include('core/Emitter.js');
// /*#*/ include('core/PaperScope.js');
// /*#*/ include('core/PaperScopeItem.js');
export * from "./core/Base";
export * from "./core/Emitter";
import { PaperScope } from "./core/PaperScope";
export * from "./core/PaperScopeItem";

// /*#*/ include('util/CollisionDetection.js');
// /*#*/ include('util/Formatter.js');
// /*#*/ include('util/Numerical.js');
// /*#*/ include('util/UID.js');
export * from "./util/CollisionDetection";
export * from "./util/Formatter";
import { Numerical } from "./util/Numerical";
export * from "./util/UID";

// Include Paper classes, which are later injected into PaperScope by setting
// them on the 'this' object, e.g.:
// var Point = Base.extend(...);

// /*#*/ include('basic/Point.js');
// /*#*/ include('basic/Size.js');
// /*#*/ include('basic/Rectangle.js');
// /*#*/ include('basic/Matrix.js');
// /*#*/ include('basic/Line.js');
export * from "./basic/Point";
export * from "./basic/Size";
export * from "./basic/Rectangle";
export * from "./basic/Matrix";
export * from "./basic/Line";

// /*#*/ include('item/Project.js');
// /*#*/ include('item/Item.js');
// /*#*/ include('item/Group.js');
// /*#*/ include('item/Layer.js');
// /*#*/ include('item/Shape.js');
// /*#*/ include('item/Raster.js');
// /*#*/ include('item/SymbolItem.js');
// /*#*/ include('item/SymbolDefinition.js');
// /*#*/ include('item/HitResult.js');
export * from "./item/Project";
export * from "./item/Item";
export * from "./item/Group";
export * from "./item/Layer";
export * from "./item/Shape";
export * from "./item/Raster";
import { SymbolItem } from "./item/SymbolItem";
import { SymbolDefinition } from "./item/SymbolDefinition";
export * from "./item/HitResult";

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
export * from "./path/Segment";
export * from "./path/SegmentPoint";
export * from "./path/Curve";
export * from "./path/CurveLocation";
export * from "./path/PathItem";
export * from "./path/Path";
export * from "./path/Path.Constructors";
export * from "./path/CompoundPath";
export * from "./path/PathItem.Boolean";
export * from "./path/PathFlattener";
export * from "./path/PathFitter";

// /*#*/ include('text/TextItem.js');
// /*#*/ include('text/PointText.js');
export * from "./text/TextItem";
export * from "./text/PointText";

// /*#*/ include('style/Color.js');
// /*#*/ include('style/Gradient.js');
// /*#*/ include('style/GradientStop.js');
// /*#*/ include('style/Style.js');
export * from "./style/Color";
export * from "./style/Gradient";
export * from "./style/GradientStop";
export * from "./style/Style";

// /*#*/ include('dom/DomElement.js');
// /*#*/ include('dom/DomEvent.js');
import { DomElement } from "./dom/DomElement";
import { DomEvent } from "./dom/DomEvent";

// /*#*/ include('view/View.js');
// /*#*/ include('view/CanvasView.js');
export * from "./view/View";
export * from "./view/CanvasView";

// /*#*/ include('event/Event.js');
// /*#*/ include('event/KeyEvent.js');
// /*#*/ include('event/Key.js');
// /*#*/ include('event/MouseEvent.js');
export * from "./event/Event";
export * from "./event/KeyEvent";
import { Key } from "./event/Key";
export * from "./event/MouseEvent";

// /*#*/ include('tool/ToolEvent.js');
// /*#*/ include('tool/Tool.js');
export * from "./tool/ToolEvent";
export * from "./tool/Tool";

// /*#*/ include('anim/Tween.js');
// export * from "./anim/Tween";

// /*#*/ include('net/Http.js');
export * from "./net/Http";

// /*#*/ include('canvas/CanvasProvider.js');
// /*#*/ include('canvas/BlendMode.js');
// /*#*/ if (__options.load) {
// /*#*/     include('canvas/ProxyContext.js');
// /*#*/ }
export * from "./canvas/CanvasProvider";
export * from "./canvas/BlendMode";

// export * from "./core/PaperScript";

export const paper = new (PaperScope.inject(Base.exports, {
  Base: Base,
  Numerical: Numerical,
  Key: Key,
  DomEvent: DomEvent,
  DomElement: DomElement,
  // Export jsdom document and window too, for Node.js
  document: document,
  window: window,
  // TODO: Remove in 1.0.0? (deprecated January 2016):
  Symbol: SymbolDefinition,
  PlacedSymbol: SymbolItem,
}))();

export * from "./version";
export * from "./straps";
// export * from "./core/Base";
