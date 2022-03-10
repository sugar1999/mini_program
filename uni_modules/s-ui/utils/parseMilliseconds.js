const list = [
  { k: 'w', modulo: 60 * 60 * 24 * 7 * 1000 },
  { k: 'd', modulo: 60 * 60 * 24 * 1000 },
  { k: 'h', modulo: 60 * 60 * 1000 },
  { k: 'm', modulo: 60 * 1000 },
  { k: 's', modulo: 1000 },
  { k: 'S', modulo: 1 },
];

/**
 * @description: 格式化毫秒为对象
 * @param {Number} time
 * @param {String|Array} fmt 默认 'd,h,m,s,S'
 * @return {object} {d,d2,h,h2,m,m2,s,s2,S,S1,S2,S3}
 * @example parseMilliseconds(5*1000) // {d:0,d2:'00',h:0,h2:'00',m:0,m2:'00',s:5,s2:'05',S:0,S1:'0',S2:'00',S3:'000'}
 */
export default function parseMilliseconds(time, fmt = 'd,h,m,s,S') {
  const obj = {};
  list.forEach(({ k, modulo }) => {
    if (fmt.indexOf(k) > -1) {
      const val = Math.floor(time / modulo);
      obj[k] = val;
      time -= val * modulo;
      if (k === 'S') {
        [1, 2, 3].forEach(len => {
          obj[`S${len}`] = String(val).slice(0, len).padStart(len, '0');
        });
      } else {
        obj[`${k}2`] = String(val).padStart(2, '0');
      }
    }
  });
  return obj;
}
