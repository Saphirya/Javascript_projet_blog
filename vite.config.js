import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // Chemin vers le dossier contenant index.html

  build: {
    outDir: "../dist", // Chemin vers le dossier de sortie
  },
});
