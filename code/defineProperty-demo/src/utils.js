export const def = function(obj, key, value, enumberable) {
  Object.defineProperty(obj, key, {
    value,
    enumberable,
    writable: true,
    configurable: true
  })
}

/**
 * var obj = {
 *  a: {
 *    b: {
 *      c: {
 *        d: 100
 *      }
 *    }
 *  }
 * }
 * var getter = parsePath('a.b.c.d');
 * var result = getter(obj)
 * consle.log(result) // 输出100
 */
export const parsePath = function(str) {
  var segments = str.split('.');
  return (obj) => {
    for (let i=0; i<segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]];
    }
    return obj
  }
}