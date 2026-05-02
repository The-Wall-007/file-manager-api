/**
 * Normalize Express "splat" parameter into a simple path string.
 * Express may provide a splat as a string or an array depending on the
 * route configuration. This helper returns a consistent string value.
 *
 * @param {string|string[]|undefined} splat
 * @returns {string}
 */
export const normalizePath = (splat) => {
  if (!splat) return "";

  return Array.isArray(splat) ? splat.join("/") : splat;
};
