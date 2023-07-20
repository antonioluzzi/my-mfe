import { Injectable } from '@angular/core';
import Geometry from '@arcgis/core/geometry/Geometry';
import Multipoint from '@arcgis/core/geometry/Multipoint';
import Point from '@arcgis/core/geometry/Point';
import Polygon from '@arcgis/core/geometry/Polygon';
import Polyline from '@arcgis/core/geometry/Polyline';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as projection from '@arcgis/core/geometry/projection';
import { arcgisToGeoJSON, geojsonToArcGIS } from '@terraformer/arcgis';
import { geojsonToWKT, wktToGeoJSON } from '@terraformer/wkt';

@Injectable({
  providedIn: 'root'
})
export class WktUtilService {

  // Costruzione della geometria a partire dalla rappresentazione WKT
  public geometry(wkt: string): Geometry {
    if (wkt === null) return new Geometry;
    const g = this._geometry(wkt);
    g.spatialReference = SpatialReference.WGS84;
    return g;
  }

  private _geometry(wkt: string): Geometry {
    var parsed = wktToGeoJSON(wkt);
    switch (parsed.type) {
      case 'Polygon':
      case 'MultiPolygon':
        return Polygon.fromJSON(geojsonToArcGIS(parsed));
      case 'Point':
        return Point.fromJSON(geojsonToArcGIS(parsed));
      case 'LineString':
      case 'MultiLineString':
        return Polyline.fromJSON(geojsonToArcGIS(parsed));
      case 'MultiPoint':
        return Multipoint.fromJSON(geojsonToArcGIS(parsed));
    }
    return Geometry.fromJSON(geojsonToArcGIS(parsed));
  }

  public geometries(wkt: string): Geometry[] {
    const gg = this._geometries(wkt);
    gg.forEach(g => { g.spatialReference = SpatialReference.WGS84; })
    return gg;
  }

  private _geometries(wkt: string): Geometry[] {
    if (wkt === null)
      return [];

    const parsed = wktToGeoJSON(wkt);
    switch (parsed.type) {
      case 'Polygon':
        return [this.geometry(wkt)];
      case 'MultiPolygon':
        return parsed.coordinates.map(c => Polygon.fromJSON(geojsonToArcGIS({ "type": "Polygon", "coordinates": c })));
      case 'Point':
        return [Point.fromJSON(geojsonToArcGIS(wktToGeoJSON(wkt)))];
      case 'LineString':
        return [this.geometry(wkt)];
      case 'MultiLineString':
        return parsed.coordinates.map(c => Polyline.fromJSON(geojsonToArcGIS({ "type": "LineString", "coordinates": c })));
      case 'MultiPoint': {
        const pp = <Multipoint>this.geometry(wkt);
        return pp.points.map((p, i) => pp.getPoint(i));
      }
    }
    return [Geometry.fromJSON(geojsonToArcGIS(wktToGeoJSON(wkt)))];
  }

  // Rappresentazione WKT della geometria, nel sistema di riferimento EPSG:4326
  public wkt(g: Geometry): string {
    var geom = g.spatialReference.isWGS84 ? g : <Geometry>projection.project(JSON.parse(JSON.stringify(g)), SpatialReference.WGS84);
    return geojsonToWKT(arcgisToGeoJSON(geom.toJSON()));
  }

}
