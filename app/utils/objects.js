export function getter(obj, path) {
  if (!path) return obj;
  if (!path.includes('.')) return obj[path];

  const [subpath, ...restPath] = path.split('.');

  return getter(obj[subpath], restPath.join('.'));
}
