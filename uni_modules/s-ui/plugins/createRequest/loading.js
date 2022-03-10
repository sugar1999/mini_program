import toast from '../../utils/toast';

let count = 0;
let showTimer = 0;
let hideTimer = 0;

/**
 * @description: 显示loading
 * @param {String} message
 * @param {Number} loadingTime
 * @return {void}
 */
function show(message, loadingTime) {
  clearTimeout(showTimer);
  clearTimeout(hideTimer);
  count++;
  showTimer = setTimeout(() => {
    toast.loading({
      message,
      custom: 'requestLoading',
    });
  }, loadingTime);
}

/**
 * @description: 关闭loading
 * @return {void}
 */
function hide() {
  clearTimeout(showTimer);
  clearTimeout(hideTimer);
  if (count > 0 && --count <= 0) {
    hideTimer = setTimeout(() => {
      if (count <= 0) {
        toast.state.custom === 'requestLoading' && toast.hide();
      }
    }, 30);
  }
}

const loading = {
  show,
  hide,
};

export default loading;
