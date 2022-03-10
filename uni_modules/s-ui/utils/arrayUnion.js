/**
 * @description: 数组并集
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 * @example: arrayUnion([1,2,3],[2,3,4]) //[1, 2, 3, 4]
 */
export default function arrayUnion(arr1 = [], arr2 = []) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...new Set([...set1, ...set2])];
}
