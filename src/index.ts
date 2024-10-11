import geolocation from "./geolocation/index";
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

  constructor() {}
}
