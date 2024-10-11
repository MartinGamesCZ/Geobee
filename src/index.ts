import geolocation from "./geolocation/index";
import OSRM from "./osrm";

export default class Geobee {
  static async geolocate(ip?: string) {
    return await geolocation(ip);
  }

  static OSRM = OSRM;

  constructor() {}
}
