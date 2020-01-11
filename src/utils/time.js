/**
 * @return {string}
 */
export function Current() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

export function DatetoString(date) {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '')

}
