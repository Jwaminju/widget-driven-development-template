export type PolygonLabelFn = () => HTMLElement;
export type PolygonCapColorFn = () => string;
export type PolygonSideColorFn = () => string;
export interface PolygonData {
  polygonsData: Object[];
  // @ts-ignore
  polygonLabel: ObjAccessor | undefined;
  polygonAltitude?: number;
  polygonCapColor?: string | PolygonCapColorFn;
  polygonSideColor?: string | PolygonSideColorFn;
}