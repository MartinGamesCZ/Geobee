import haversine from "haversine-distance";

export default function haversineDistance(
  a: [number, number],
  b: [number, number]
) {
  return haversine(a, b);
}
