import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
    }),
    paths: {
      // Set BASE_PATH=/sexploration in CI for GitHub Pages project sites.
      // Leave unset (or empty) for custom domains / local dev.
      base: process.env.BASE_PATH ?? '',
    },
    // GitHub Pages serves dir/index.html reliably; using 'never' (default)
    // generates experiences.html alongside the experiences/ directory, causing
    // the static server to prefer the directory and 404 on direct navigation.
    trailingSlash: 'always',
  },
};
