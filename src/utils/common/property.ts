type Class<T = any> = new (...args: any[]) => T;
function applyPropertiesValueFrom<T = Class>(base:Class,from:Object): T{
  const properties = Object.getOwnPropertyNames(from)
  const $class = new base()
  for (let key of properties){
    $class[key] = from[key]
  }
  return $class
}