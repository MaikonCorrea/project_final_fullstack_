import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Mantém a porta 3000 para não quebrar seus cors do backend
  },
  build: {
    outDir: 'build', // O CRA gera na pasta 'build', o Vite na 'dist'. Mantivemos 'build' para compatibilidade.
  }
});