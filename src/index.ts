import geolocation from "./geolocation/index";
import haversineDistance from "./haversine";
import OSRM from "./osrm";

export default class Geobee {
  static async geolocate(ip?: string) {
    return await geolocation(ip);
  }

  static OSRM = OSRM;
  static haversineDistance = haversineDistance;

  constructor() {}
}
