const mongoose = require('mongoose');

const DB_URL = 'mongodb://47.96.109.136:27017/blog';

mongoose.Promise = global.Promise;

// 连接数据库
mongoose.connect(
  DB_URL,
  (err) => {
    if (!err) {
      console.log('connected success');
    } else {
      console.log('connected fail');
    }
  },
);

const models = {
  users: {
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    prefix: String, // 手机号前缀
    phone: Number,
    website: String,
    age: Number,
    sex: String,
    birthday: String,
    avatar: String,
    pwd: { type: String, require: true },
    create_time: { type: Date, require: true },
    last_modify: Date,
    last_logout: Date,
    last_login: Date,
    last_ua: String,
  },
};

for (const m in models) {
  if (Object.prototype.hasOwnProperty.call(models, m)) {
    mongoose.model(m, new mongoose.Schema(models[m]));
  }
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  },
};
