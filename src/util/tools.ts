export function Array2Object(array: any[]): { [propName: string]: string } {
  const obj: { [propName: string]: string } = {};
  for (let i = 0, len = array.length; i < len; i++) {
    obj[array[i]] = array[++i];
  }
  return obj;
}
