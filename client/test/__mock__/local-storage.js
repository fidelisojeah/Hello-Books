class localStorage {
  /**
   * @static
   * @param {any} key
   * @param {any} value
   * @returns {object} setItem
   * @memberOf localStorage
   */
  static setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
    // return { ...localStorage, [key]: value };
  }

  /**
   * @static
   * @param {any} key
   * @returns  {object} item
   * @memberOf localStorage
   */
  static getItem(key) {
    return localStorage[key];
  }

  /**
   * @static
   * @param {any} key
   * @returns {undefined}
   * @memberOf localStorage
   */
  static removeItem(key) {
    delete localStorage[key];
  }

  /**
   * @static
   * @returns {undefined}
   * @memberOf localStorage
   */
  static clear() {
    localStorage = {};
  }
}
export default localStorage;
