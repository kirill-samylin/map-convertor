import {utils, read} from 'xlsx'
import {coordinateTransform} from './proj4'

export function loadFile(file) {
  return new Promise((success, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const bstr = e.target.result;
      const wb = read(bstr, {type: 'binary'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws, {header: 1});
      success({
        headers: data[0],
        body: data.slice(1).map((item) => {
          if (item.length === 0) return item
          const [number, size, x, y] = item;
          if (!Boolean(x) || !Boolean(y)) return item
          const coordinate = coordinateTransform(x, y)
          return [number, size, coordinate.x, coordinate.y]
        })
      })
    }
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  })
}
