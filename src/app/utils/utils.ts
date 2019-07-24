export function flatenArrayOfArray<T>(array: Array<Array<T>>): Array<T> {
  return [].concat.apply([], array);
}

export function swapCoordinates<T>(array: Array<Array<T>>): Array<Array<T>> {
  const result: Array<Array<T>> = [];
  array.forEach(coordinate => {
    result.push([coordinate[1], coordinate[0]]);
  });
  return result;
}

export function extractBoundingBox(array: Array<Array<number>>): Array<number> {
  let minLat = 90;
  let maxLat = -90;
  let minLon = 180;
  let maxLon = -180;
  array.forEach(coordinate => {
    if (coordinate[0] < minLat) {
      minLat = coordinate[0];
    }
    if (coordinate[0] > maxLat) {
      maxLat = coordinate[0];
    }
    if (coordinate[1] < minLon) {
      minLon = coordinate[1];
    }
    if (coordinate[1] > maxLon) {
      maxLon = coordinate[1];
    }
  });
  return [minLon, minLat, maxLon, maxLat];
}

export function inflateBoundingBox(boundingBox: Array<number>, radiusM: number) {
  const inflationFactor = radiusM / 111000;
  const minLon = boundingBox[0];
  const minLat = boundingBox[1];
  const maxLon = boundingBox[2];
  const maxLat = boundingBox[3];
  return [minLon - inflationFactor, minLat - inflationFactor, maxLon + inflationFactor, maxLat + inflationFactor];
}
