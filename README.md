# What is this all about

Demo logistics applicaiton.

Application allows you to select one of the existing preloaded routes and shows it on the map.
It is possible to create a new route using preloaded points of destination and point of departure.

Coordinates are fetching from the [nominatim](https://nominatim.openstreetmap.org)

Orders and points are mocked [here](https://github.com/tarassov/weather-widget/blob/master/src/services/mock-data/mokc-points.ts)

&nbsp;

<img src="https://github.com/tarassov/logistic-demo/raw/master/example/demo-logistic.png" width="300">

## DEMO: You can find the demo [HERE](https://tarassov.github.io/logistic-demo/)

&nbsp;

# This project uses following technology stack:

- React.js 18.2
- Typescript
- Redux + Redux Toolkit
- Redux-Saga
- [leafletjs](https://leafletjs.com/) map
- [Ant Design](https://ant.design/) components
- [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/) for generating map routes

This application uses OSRM's demo server for demo purposes and it is **NOT SUITABLE FOR PRODUCTION USE**.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)+ [Eslint](https://marketplace.visualstudio.com/items?itemName=Eslint).

## Project Setup

If you want to run it locally then clone the repo and after:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm start
```
