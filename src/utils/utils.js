/**
 * 
 * @param {Function} func 
 * @param {Number} delay 
 * @return {Function}
 */
export function deBounce(func, delay) {

  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.call(this);
      timer = null;
    }, delay);
  }

}

/**
 * 
 * @param {Function} func 
 * @param {Number} delay 
 * @return {Function}
 * @returns 
 */
export function throttle(func, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      func.call(this);
      timer = null;
    }, delay);
  }
}