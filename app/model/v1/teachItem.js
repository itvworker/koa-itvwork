const imgModel = require(path.join(webconfig.v1, 'images.js'));
class TeachItem {
    constructor() {
        this.schema = new mdb.Schema({
            _id: {
                type: String,
                default: tool.getid()
            },
            pid: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ""
            },
            content: {
                type: String,
                default: ""
            },
            view: {
                type: Number,
                default: 0
            },
            comments: {
                type: Number,
                default: 0
            },
            update_time: {
                type: Number,
                default: tool.time()
            },
            cover: {
                type: String,
                default: ''
            },
            add_time: {
                type: Number,
                default: tool.time()
            }
        }, {
            collection: 'teach_item',
            versionKey: false
        });

        this.model = mdb.model('teach_item', this.schema);
    }

    async add(data) {
        await imgModel.useInc({
            path: data.cover
        }, 1);
        data['_id'] = tool.getid();
        data['update_time'] = data['add_time'] = tool.time();
        return new this.model(data).save().then(function(result) {
            return {
                err_code: 200,
                err_msg: '添加成功',
                data: result
            }
        }, function(err) {
            return {
                err_code: 103,
                err_msg: '添加失败'
            }
        })
    }

    async find(query) {
        return this.model.find(query).sort({
            add_time: -1
        }).then(function(result) {

            return {
                err_code: 200,
                err_msg: '查找成功',
                data: result
            }
        }, function(err) {
            return {
                err_code: 0,
                err_msg: '数据库错误'
            };
        });

    }
    async findone(data) {
        return this.model.find(data).then(function(result) {
            if (result === null) {
                return {
                    err_code: 0,
                    err_msg: '没有数据'
                };
            }
            return {
                err_code: 200,
                err_msg: '查找成功',
                data: result
            }
        }, function(err) {
            return {
                err_code: 0,
                err_msg: '数据库错误'
            };
        });
    }

    async del(data) {
        if (!data['cover']) {
            return {
                err_code: 0,
                err_msg: '数据库错误'
            };
        }
        if (!data['_id']) {
            return {
                err_code: 0,
                err_msg: '数据库错误'
            };
        }
        await imgModel.useInc({
            path: data.cover
        }, -1);
        return this.model.remove(data).then(function(result) {
            return {
                err_code: 200,
                err_msg: '删除成功'
            };
        }, function(err) {
            return {
                err_code: 0,
                err_msg: '数据库错误'
            };
        });
    }

    async update(check, doc) {
        return this.model.update(check, doc).then(function(result) {

            return {
                err_code: 200,
                err_msg: '修改成功',
                data: result
            }
        }, function(err) {
            return {
                err_code: 0,
                err_msg: '数据库错误'
            }
        });
    }
}

module.exports = new TeachItem();
