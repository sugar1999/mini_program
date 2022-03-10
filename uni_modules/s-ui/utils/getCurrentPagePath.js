/**
 * @description: 获取当前页的url
 * @return {String}
 */
export default function getCurrentPagePath() {
  const pages = getCurrentPages(); // 获取加载的页面
  const currentPage = pages[pages.length - 1]; // 获取当前页面的对象
  return currentPage.route;
}
