/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'vercel',
  ignoredRouteFiles: ['**/.*'],
  publicPath: '/build/',
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: [
    'react-dnd',
    'dnd-core',
    /^@react-dnd\//,
    'react-dnd-html5-backend',
  ],
  browserNodeBuiltinsPolyfill: { modules: { 'fs/promises': true, path: true } },
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
  },
  sourcemap: true,
  serverMinify: false,
};
