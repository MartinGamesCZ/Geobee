import geolocation from "./geolocation/index";

export default class Geobee {
  static async geolocate(ip?: string) {
    return await geolocation(ip);
  }

  constructor() {}
}
