import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import {
  createRoutesFromFolders,
} from "@remix-run/v1-route-convention";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      staticFiles: {
        include: ["public/**/*"],
      },
      ignoredRouteFiles: ["**/.*", "**/*.css"],
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
    }),
  ],
});
