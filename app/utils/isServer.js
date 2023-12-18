export function isServer() {
  return typeof process !== 'undefined';
}
