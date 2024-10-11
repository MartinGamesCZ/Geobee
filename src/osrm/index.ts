import axios from "axios";

export default class OSRM {
  server: string = "https://router.project-osrm.org";

  constructor(server: string = this.server) {
    this.server = server;
  }

  async getPath(start: [number, number], end: [number, number]) {
    const { data } = await axios({
      baseURL: this.server,
      url:
        "/route/v1/driving/" + [start, end].map((c) => c.join(",")).join(";"),
      params: {
        steps: true,
        alternatives: false,
        overview: "full",
        geometries: "geojson",
      },
      method: "get",
    });

    return data;
  }
}
