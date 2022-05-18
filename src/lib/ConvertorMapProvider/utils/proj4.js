import proj4 from 'proj4'
import {zones} from '../constants/zones'

let projSource = null
let projDest = null

const destZones = Object.keys(proj4.defs)

const init = () => {
  zones.forEach(([name, zone]) =>   proj4.defs(name, zone))
}

init()

const coordinateTransform = (x, y, sourceName = 'MB:6335404', destName= 'WGS84') => {
  if (!projSource) {
    projSource = new proj4.Proj(sourceName)
    projDest = new proj4.Proj(destName)
  }

  const pointSource = proj4.toPoint([x, y])
  const pointSourceSorted = proj4.toPoint([pointSource.y, pointSource.x]);
  const pointDest = proj4.transform(projSource, projDest, pointSourceSorted);
  return proj4.toPoint([pointDest.y, pointDest.x]);
}

const getGeoJson = (arr) => {
  const features = arr.reduce((acc, item) => {
    const [number, size, x, y] = item;
    if (number) {
      acc.push({
        "type": "Feature",
        "id": number - 1,
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[y, x]]]
        },
        "properties": {
          "description": `Участок №${number}, Размер ${size}м2`,
          "fill": "#ed4543",
          "fill-opacity": 0.6,
          "stroke": "#ed4543",
          "stroke-width": "1",
          "stroke-opacity": 0.9
        }
      })
      return acc
    }
    if (!x || !y) {
      if (item.length === 0) {
        const index = acc.length - 1
        acc[index].geometry.coordinates[0].push(acc[index].geometry.coordinates[0][0])
      }
      return acc
    }
    acc[acc.length - 1].geometry.coordinates[0].push([y, x])
    return acc
  }, [])

  const geoJson = {
    "type": "FeatureCollection",
    "metadata": {
      "name": "Карта",
      "creator": "Yandex Map Constructor"
    },
    features,
  }
  return geoJson
}


export {
  destZones,
  zones,
  coordinateTransform,
  getGeoJson,
}
