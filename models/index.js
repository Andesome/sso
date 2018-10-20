const mongoose = require('mongoose');
const DB_URL = "mongodb://47.96.109.136:27017/blog";

mongoose.Promise = global.Promise;

// 连接数据库
mongoose.connect(
    DB_URL,
    (err, db) => {
        if (!err) {
            console.log('connected success');
        } else {
            console.log('connected fail');
        }
    }
);

const models = {
    users: {
        name: String,
        age: Number,
        sex: String,
        birthday: String,
        avatar: String,
        pwd: String,
        create_time: { type: Date, require: true },
    }
}

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
