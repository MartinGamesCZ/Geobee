import haversineDistance from "@/haversine";
import OSRM from "@/osrm";

export default class TSP {
  osrm: OSRM;

  constructor(osrm: OSRM = new OSRM()) {
    this.osrm = osrm;
  }

  async find(points: [number, number][], start_index: number) {
    const num_of_points = points.length;
    let current_index = start_index;

    const distances = await this._getDistances(points);
    const visited = Array(num_of_points).fill(false);

    const path = [];

    path.push(current_index);
    visited[current_index] = true;

    for (let i = 1; i < num_of_points; i++) {
      const next_index = await this._getNearestNeighbour(
        current_index,
        points,
        distances,
        visited
      );

      if (next_index === -1) break;

      path.push(next_index);
      visited[next_index] = true;

      current_index = next_index;
    }

    return path;
  }

  async findRoute(points: [number, number][], start_index: number) {
    const route = [];

    const tsp_find_result = await this.find(points, start_index);

    const waypoints = tsp_find_result.map((p: number) => points[p]);

    for (let n = 0; n < waypoints.length; n++) {
      if (!waypoints[n + 1]) continue;

      const p = await this.osrm.getPath(waypoints[n], waypoints[n + 1]);

      route.push(p.routes[0].geometry);
    }

    return {
      route,
      waypoints: waypoints.map((w) => w.reverse()),
    };
  }

  async _getNearestNeighbour(
    current_index: number,
    points: [number, number][],
    distances: number[][],
    visited: boolean[]
  ) {
    let nearest = -1;
    let min = Number.MAX_VALUE;

    for (let i = 0; i < points.length; i++) {
      if (visited[i] || distances[current_index][i] >= min) continue;

      nearest = i;
      min = distances[current_index][i];
    }

    return nearest;
  }

  async _getDistances(points: [number, number][]) {
    const distances = [];

    for (let i = 0; i < points.length; i++) {
      const d = [];

      for (let j = 0; j < points.length; j++) {
        if (i === j) {
          d.push(0);
          continue;
        }

        const data = await this.osrm.getPath(points[i], points[j]);

        d.push(this._getPathLength(data.routes[0].geometry.coordinates));
      }

      distances.push(d);
    }

    return distances;
  }

  _getPathLength(points: [number, number][]) {
    let length = 0;

    for (let i = 0; i < points.length - 1; i++) {
      length += haversineDistance(points[i], points[i + 1]);
    }

    return length;
  }
}
