/**
 * @return {string}
 */
export function Current() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}
