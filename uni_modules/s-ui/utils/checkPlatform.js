import platform from './platform';

/**
 * @description: 判断 uni-app 当前运行环境
 * @param {String|Array<String>} plat
 * @return {Boolean}
 * @example: checkPlatform('h5')
 */
export default function checkPlatform(plat = '') {
  return (Array.isArray(plat) ? plat : [plat]).map(str => str.toLowerCase()).includes(platform);
}
