export function isDm(user = {}) {
  return user.roles?.includes('dm');
}
