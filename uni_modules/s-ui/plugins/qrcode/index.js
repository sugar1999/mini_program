import extend from '../../utils/extend';
import utf16to8 from '../../utils/utf16to8';
import { QRCode, QRErrorCorrectLevel } from '../../lib/qrcode';

const defaultOptions = {
  width: 256,
  height: 256,
  x: 0,
  y: 0,
  typeNumber: -1,
  correctLevel: QRErrorCorrectLevel.H,
  background: '#ffffff',
  foreground: '#000000',
  image: {
    imageResource: '',
    dx: 0,
    dy: 0,
    dWidth: 100,
    dHeight: 100,
  },
};

/**
 * @description: qrcode二维码绘制
 * @param {defaultOptions} options
 * @return {void}
 */
export default function Qrcode(options) {
  options = extend(true, {}, defaultOptions, options);
  if (!options.canvasId && !options.ctx) {
    console.warn('please set canvasId or ctx!');
    return;
  }
  createCanvas();
  function createCanvas() {
    // create the qrcode itself
    var qrcode = new QRCode(options.typeNumber, options.correctLevel);
    qrcode.addData(utf16to8(options.text));
    qrcode.make();

    // get canvas context
    var ctx;
    if (options.ctx) {
      ctx = options.ctx;
    } else {
      ctx = options._this
        ? uni.createCanvasContext && uni.createCanvasContext(options.canvasId, options._this)
        : uni.createCanvasContext && uni.createCanvasContext(options.canvasId);
    }

    // compute tileW/tileH based on options.width/options.height
    var tileW = options.width / qrcode.getModuleCount();
    var tileH = options.height / qrcode.getModuleCount();

    // draw in the canvas
    for (var row = 0; row < qrcode.getModuleCount(); row++) {
      for (var col = 0; col < qrcode.getModuleCount(); col++) {
        var style = qrcode.isDark(row, col) ? options.foreground : options.background;
        ctx.setFillStyle(style);
        var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
        var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
        ctx.fillRect(Math.round(col * tileW) + options.x, Math.round(row * tileH) + options.y, w, h);
      }
    }
    if (options.image.imageResource) {
      ctx.drawImage(
        options.image.imageResource,
        options.image.dx,
        options.image.dy,
        options.image.dWidth,
        options.image.dHeight,
      );
    }
    ctx.draw(true, function (e) {
      options.callback && options.callback(e);
    });
  }
}
