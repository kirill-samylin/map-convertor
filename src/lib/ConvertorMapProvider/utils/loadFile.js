import {utils, read} from 'xlsx'

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
        body: data.slice(1).filter(([n, s, x, y]) => x && y)
      })
    }
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  })
}
