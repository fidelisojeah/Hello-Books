
/**
 *
 * @param {string} str
 *
 * @returns {string} Title Cased String
 */
export default function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}
