/**
 * @description: 有些函数采用可变数量的参数，或采用一些预期参数
参数，然后是要操作的可变数量的值
在…上此帮助程序将所有剩余参数累加到函数的
参数长度（或显式的“startIndex”）转换为
最后一个论点。类似于ES6的“rest参数”。
 * @param {Function} func
 * @param {Number} startIndex
 * @return {Function}
 */
export default function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0);
    var rest = Array(length);
    var index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, arguments[0], rest);
      case 2: return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
}
