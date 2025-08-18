import type { Layer } from '~/item/Layer';
import type { Item } from '~/item/Item';
import type { Project } from '~/item/Project';
import type { Group } from '~/item/Group';
import type { HitResult } from '~/item/HitResult';
import type { Raster } from '~/item/Raster';
import type { SymbolItem } from '~/item/SymbolItem';
import type { Shape } from '~/item/Shape';
import type { BlendMode } from '~/canvas/BlendMode';
import type { CanvasProvider } from '~/canvas/CanvasProvider';
import type { View } from '~/view/View';
import type { CanvasView } from '~/view/CanvasView';
import type { PaperScope } from '~/core/PaperScope';
import type { Formatter } from '~/util/Formatter';
import type { Rectangle } from '~/basic/Rectangle';
import type { Point } from '~/basic/Point';
import type { Size } from '~/basic/Size';
import type { Style } from '~/style/Style';
import type { Gradient } from '~/style/Gradient';
import type { GradientStop } from '~/style/GradientStop';
import type { Tween } from '~/anim/Tween';
import type { Color } from '~/style/Color';
import type { DomEvent } from '~/dom/DomEvent';
import type { DomElement } from '~/dom/DomElement';
import type { Event } from '~/event/Event';
import type { CurveLocation } from '~/path/CurveLocation';
import type { Curve } from '~/path/Curve';
import type { PathFlattener } from '~/path/PathFlattener';
import type { PathFitter } from '~/path/PathFitter';
import type { Path } from '~/path/Path';
import type { PathItem } from '~/path/PathItem';
import type { CompoundPath } from '~/path/CompoundPath';
import type { SegmentPoint } from '~/path/SegmentPoint';
import type { Segment } from '~/path/Segment';
import type { KeyEvent } from '~/event/KeyEvent';
import type { MouseEvent } from '~/event/MouseEvent';
import type { Base } from './straps';

export const ref = {
  straps: null as typeof Base,
  paper: null as any,
  Layer: null as typeof Layer,
  Item: null as typeof Item,
  Formatter: null as typeof Formatter,
  Rectangle: null as typeof Rectangle,
  Point: null as typeof Point,
  Size: null as typeof Size,
  BlendMode: null as typeof BlendMode,
  CanvasProvider: null as typeof CanvasProvider,
  Project: null as typeof Project,
  View: null as typeof View,
  PaperScope: null as typeof PaperScope,
  Path: null as typeof Path,
  CompoundPath: null as typeof CompoundPath,
  Style: null as typeof Style,
  Gradient: null as typeof Gradient,
  GradientStop: null as typeof GradientStop,
  Tween: null as typeof Tween,
  Group: null as typeof Group,
  HitResult: null as typeof HitResult,
  Raster: null as typeof Raster,
  SymbolItem: null as typeof SymbolItem,
  PathItem: null as typeof PathItem,
  Color: null as typeof Color,
  DomEvent: null as typeof DomEvent,
  DomElement: null as typeof DomElement,
  Event: null as typeof Event,
  CurveLocation: null as typeof CurveLocation,
  Curve: null as typeof Curve,
  PathFlattener: null as typeof PathFlattener,
  PathFitter: null as typeof PathFitter,
  Shape: null as typeof Shape,
  SegmentPoint: null as typeof SegmentPoint,
  Segment: null as typeof Segment,
  CanvasView: null as typeof CanvasView,
  KeyEvent: null as typeof KeyEvent,
  MouseEvent: null as typeof MouseEvent,
};
