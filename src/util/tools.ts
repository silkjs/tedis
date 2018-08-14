export function Mixins<T>(base: any, froms: any[]): T {
  class Mixin extends base {}
  froms.forEach((from) => {
    Reflect.ownKeys(from.prototype).forEach((name) => {
      (Mixin.prototype as any)[name] = from.prototype[name];
    });
  });
  return Mixin as any;
}

export function Array2Object(array: any[]): { [propName: string]: string } {
  const obj: { [propName: string]: string } = {};
  for (let i = 0, len = array.length; i < len; i++) {
    obj[array[i]] = array[++i];
  }
  return obj;
}
