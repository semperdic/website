import { defineConfig } from 'astro/config';

// Project Pages site: https://semperdic.github.io/website/
// When moving to semperdic.com later, set site to that domain and base to '/'.
// Destinations include /website so static redirect HTML works on GitHub Pages
// (Astro hash redirects currently omit base from absolute paths).
export default defineConfig({
  site: 'https://semperdic.github.io',
  base: '/website',
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/authentication': '/website/privacy/#authentication',
    '/auth': '/website/privacy/#authentication',
    '/data-storage': '/website/privacy/#data-storage',
    '/data': '/website/privacy/#data-storage',
    '/data-policy': '/website/privacy/#data-policy',
    '/privacy-policy': '/website/privacy/#privacy-policy',
    '/legal': '/website/privacy/',
    '/help': '/website/support/',
    '/docs': '/website/manual/',
    '/faq': '/website/manual/faq/',
  },
});
