/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'vercel',
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
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
};
