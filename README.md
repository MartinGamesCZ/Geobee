# Geobee

Your "geo related stuff" Swiss knife.

This library includes several tools to help you with geolocation, route finding, TSP and more.

## Installation
```bash
bun add geobee
```

or 

```bash
npm i geobee
```

## Usage
### Geolocation
This tool is used to get approximate location of the device. If you don't pass IP address to geolocate, it will use you current one (useful for websites).

Uses: [ip-api.com](https://ip-api.com)

```ts
// Geobee.geolocate([IP]) -> Location
const location = await Geobee.geolocate("123.123.12.3")

// Can also be used in browser, will use users' IP

const location = await Geobee.geolocate();
```

### Haversine distance
This tool allows you to get distance in meters "as the crow flies" (shortest distance through air).

Uses: [haversine-distance NPM package](https://npmjs.com/package/haversine-distance)

```ts
// Geobee.haversineDistance(pointA { lat, lng }, pointB { lat, lng }) -> Distance in meters
const distance = Geobee.haversineDistance([50.9, 12.1], [50.91, 12.0])
```

### OSRM
Uses `open source routing machine` to find the route (driving) between two coordinates. The API is self-hostable. If you want, you can provide URL for your own instance, instead of using the official one.

> ! Please note that the array of coordinates is reversed in some places (for example getPath parameters) due to coordinate handling of OSRM, will remap later.

Uses: [project-osrm.org API](https://project-osrm.org)

```ts
// OSRM.getPath(start { lng, lat }, end { lng, lat }) -> GeoJSON-formatted route and waypoints
const path = await new Geobee.OSRM().getPath([12.1, 50.9], [12.0, 50.91]);

// With custom instance
const path = await new Geobee.OSRM("http://localhost:5000").getPath([12.1, 50.9], [12.0, 50.91])
```

### TSP Path Finder
Uses OSRM with TSP (Travelling salesman problem) algorithm to find the optimal path given starting point and multiple points we need to go to.

> ! Please note that the input array of coordinates is reversed due to coordinate handling of OSRM, will fix later.

```ts
// TSP.findRoute(coordinates { lng, lat }[], start_index { number }) -> GeoJSON formatted route and waypoints
const path = await new Geobee.TSP().findRoute([[12.1, 50.9], [12.0, 50.91], [12.24, 49.12]], 0)

// With custom OSRM instance:
const path = await new Geobee.TSP(osrm).findRoute(...)
```

This will give you object with waypoints and route (which is array of invidual routes between places ordered to be the shortest total distance). The start_index parameter is used to mark in which point we start, making it the first one in the route.

You can also use the `find` function (same usage), that will give you only the array with indexes of the places sorted to be shortest total distance (For example [0, 2, 1]). The first element is always equal to the start_index.