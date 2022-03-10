/**
 * @description: 获取当前页带参数的完整url
 * @return {String}
 */
export default function getCurrentPageQueryPath() {
  const pages = getCurrentPages(); // 获取加载的页面
  const currentPage = pages[pages.length - 1]; // 获取当前页面的对象
  const url = currentPage.route; // 当前页面url
  const options = currentPage.options; // 如果要获取url中所带的参数可以查看options
  // 拼接url的参数
  let urlWithArgs = '/' + url + '?';
  for (const key in options) {
    urlWithArgs += key + '=' + options[key] + '&';
  }
  return urlWithArgs.slice(0, -1);
}
