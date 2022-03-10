/**
 * @description: 拨打电话
 * @param {String} phoneNumber
 * @return {void}
 * @example callPhone('15234855555')
 */
export default function callPhone(phoneNumber) {
  uni.makePhoneCall({
    phoneNumber: String(phoneNumber),
    success() { },
    fail() { },
  });
}
