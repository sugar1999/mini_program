/*
 * @Description: 用于touch事件的一些处理
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-08-08 18:20:11
 * @LastEditTime: 2021-10-11 15:06:22
 * @LastEditors: 无痕
 */
export default function useTouch() {
  return {
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    direction: '',
    getTouch(e) {
      return e.touches ? e.touches[0] : e.target;
    },
    getDirection() {
      const { deltaX, deltaY, offsetX, offsetY } = this;
      if (offsetX > offsetY && deltaX > 0) {
        return 'right';
      }
      if (offsetX > offsetY && deltaX < 0) {
        return 'left';
      }
      if (offsetX < offsetY && deltaY < 0) {
        return 'top';
      }
      if (offsetX < offsetY && deltaY > 0) {
        return 'bottom';
      }
      return '';
    },
    isHorizontal() {
      return ['left', 'right'].includes(this.direction);
    },
    isVertical() {
      return ['top', 'bottom'].includes(this.direction);
    },
    reset() {
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.direction = '';
    },
    start(e) {
      this.reset();
      const touch = this.getTouch(e);
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    move(e) {
      const touch = this.getTouch(e);
      const deltaX = touch.clientX - this.startX;
      const deltaY = touch.clientY - this.startY;
      this.deltaX = deltaX;
      this.deltaY = deltaY;
      this.offsetX = Math.abs(deltaX);
      this.offsetY = Math.abs(deltaY);
      this.direction = this.direction || this.getDirection();
    },
  };
}
