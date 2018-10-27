const jwt = require('jsonwebtoken');

/**
 * 生成jwt
 * @param {Object} payload 载荷
 * @param {String} secret  秘钥
 */
function generateJWT(payload, secret, options = {}) {
  return jwt.sign(payload, secret, { expiresIn: '1h', ...options });
}

/**
 * 校验jwt
 * @param {String} token jwt
 * @param {String} secret  秘钥
 * @returns {Object} {isPass:'校验是否通过',payload:'载荷',err:'错误信息object，没有为空'}
 */
function verifyJWT(token, secret) {
  let flag = false; // 是否通过
  let payload = {};
  let errorMsg = '';
  jwt.verify(token, secret, (err, decode) => {
    if (!err) {
      flag = true;
      payload = decode;
    } else {
      errorMsg = { ...err };
    }
  });
  return { isPass: flag, payload, err: errorMsg };
}

module.exports = {
  generateJWT,
  verifyJWT,
};
