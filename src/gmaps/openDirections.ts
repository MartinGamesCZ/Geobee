export default function openDirections(coords: [number, number]) {
  return `https://www.google.com/maps/dir/?api=1&destination=${coords.join(
    ","
  )}`;
}
