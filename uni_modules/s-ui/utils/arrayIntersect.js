/**
 * @description: 数组交集
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 * @example: arrayIntersect([1,2,3],[2,3,4]) //[2, 3]
 */
export default function arrayIntersect(arr1 = [], arr2 = []) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...new Set([...set1].filter(x => set2.has(x)))];
}
