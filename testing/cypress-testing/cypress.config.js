import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const mode = config.env.mode;
      return {
        ...config,
        baseUrl: mode == 'github' ? 'https://pridebnath.github.io/Notes/' : "http://localhost:5173/",
      };
    },
    watchForFileChanges: false
  },
});
