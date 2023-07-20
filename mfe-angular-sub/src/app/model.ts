export interface FeatureSelection {
    wkt: string;
    features: Feature[];
}

export interface Feature {
    id: number;
    attributes: { key: string; value: any }[];
    geometry: string;
}

export interface BasemapConfiguration {
    baseMaps: string[];
}

export interface MapConfiguration extends BasemapConfiguration {
    id: string;
    attributes: string[];
    restServiceUrl: string;
    labelAttribute: string;
    color: string;
    lineSize: string;
    fontSize: number;
    maximunZoomLevel: number;
}

export interface SearchConfiguration {
    id: string;
    attributes: string[];
    restServiceUrl: string;
    searchAttributes: string[];
}