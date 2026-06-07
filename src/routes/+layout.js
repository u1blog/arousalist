export const prerender = true;
// GitHub Pages serves dir/index.html reliably; using 'never' (default)
// generates experiences.html alongside the experiences/ directory, causing
// the static server to prefer the directory and 404 on direct navigation.
export const trailingSlash = 'always';
