import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // Chemin vers le dossier contenant index.html

  build: {
    outDir: "../dist", // Chemin vers le dossier de sortie
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        form: resolve(__dirname, "src/form/form.html"),
      },
    },
  },
});
