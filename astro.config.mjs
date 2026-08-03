import { defineConfig } from 'astro/config';

// Project Pages site: https://semperdic.github.io/website/
// When moving to semperdic.com later, set site to that domain and base to '/'.
export default defineConfig({
  site: 'https://semperdic.github.io',
  base: '/website',
  output: 'static',
  trailingSlash: 'always',
});
