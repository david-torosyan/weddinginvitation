import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveSiteUrl() {
  const raw = process.env.SITE_URL
    || process.env.VITE_SITE_URL
    || process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL
    || 'http://localhost:5173';

  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withScheme.replace(/\/+$/, '');
}

function htmlSiteUrlPlugin() {
  const siteUrl = resolveSiteUrl();

  return {
    name: 'html-site-url',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteUrl);
    },
  };
}

export default defineConfig({
  plugins: [react(), htmlSiteUrlPlugin()],
});
