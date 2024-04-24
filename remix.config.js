const {
  createRoutesFromFolders,
} = require("@remix-run/v1-route-convention");

module.exports = {
  serverBuildTarget: 'vercel',
  // Specify where Remix should look for static assets
  // Adjust the paths as needed based on your project structure
  // This is an example assuming your images are in the 'public' folder
  staticFiles: {
    include: ['public/**/*'],
  },
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  future: {
    v2_dev: true,
    unstable_cssModules: true,
  },
  serverDependenciesToBundle: [
    'react-dnd',
    'dnd-core',
    /^@react-dnd\//,
    'react-dnd-html5-backend',
  ],
  sourcemap: true,
  routes(defineRoutes) {
    return createRoutesFromFolders(defineRoutes);
  }
};
