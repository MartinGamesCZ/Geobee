import geolocation from "./geolocation/index";
import openDirections from "./gmaps/openDirections";
import haversineDistance from "./haversine";
import OSRM from "./osrm";
import TSP from "./tsp";

export default class Geobee {
  static async geolocate(ip?: string) {
    return await geolocation(ip);
  }

  static OSRM = OSRM;
  static TSP = TSP;
  static haversineDistance = haversineDistance;
  static openGMapsDirections(coords: [number, number]) {
    return openDirections(coords);
  }

  constructor() {}
}
