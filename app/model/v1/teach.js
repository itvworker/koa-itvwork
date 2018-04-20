const imgModel = require(path.join(webconfig.v1, 'images.js'));
class Teach {
    constructor() {
        this.schema = new mdb.Schema({
            _id: {
                type: String,
                index: true
            },
            title: {
                type: String,
                default: ""
            },
            update_time: {
                type: String,
                default: ""
            },
            source: {
                type: String,
                default: ''
            },
            author: {
                type: String,
                default: ''
            },
            cover: {
                type: Object,
                default: ''
            },
            views: {
                type: Number,
                default: 0
            },
            sort: {
                type: String,
                default: ''
            },
            tags: {
                type: Array,
                default: []
            },
            chapter: {
                type: Object,
                default: []
            },
            knowledge: {
                type: String,
                default: ''
            },
            like: {
                type: Number,
                default: 0
            },
            info: {
                type: String,
                default: ''
            },
            add_time: {
                type: Number,
                default: tool.time()
            }

        }, {
            collection: 'teach',
            versionKey: false
        });

        this.model = mdb.model('teach', this.schema);


    }

    //添加content
    async add(data) {
        data['add_time'] = tool.time();
        data['_id'] = tool.getid();
        data['update_time'] = data['add_time'];
        let arr = [];
        arr[0] = data.cover;
        if (arr.lenght > 0) {
            let err = await imgModel.useInc({
                path: [data.cover]
            }, 1);
        }
        return new this.model(data).save().then(function(result) {
            return tool.dataJson(200, '查询成功', result);

        }, function(err) {
            return tool.dataJson(103, '添加失败');
        })

    }
    count(query) {
        return this.model.find(query).count(function(result) {
            return result;
        });
    }
    async find(arg) {
        arg['query'] = arg['query'] ? arg['query'] : {};
        arg['sort'] = arg['sort'] ? arg['sort'] : {
            add_time: -1
        };
        let count = await this.count(arg['query']);
        return this.model.find(arg.query).skip(parseInt(arg.page)-1).limit(parseInt(arg.num)).sort(arg.sort).then(function(result) {

            if (result) {
                return tool.dataJson(200, '查询成功', {
                    count: count,
                    result: result
                })
            } else {
                return tool.dataJson(105, '没有数据');
            }


        }, function(err) {
            return tool.dataJson(104, '错误', err);
        })
    }
    async findOne(data) {

        return this.model.findOne(data).then(function(result) {
            if (result) {
                return tool.dataJson(200, '查询成功', result)

            } else {
                return tool.dataJson(105, '没有数据');
            }

        }, function(err) {
            return tool.dataJson(104, '错误', err);

        })
    }
    async updata(data) {
        let newImg = tool.getImgurl(data.content);
        newImg.push(data.cover);
        let olddata = await this.findOne({
            _id: data._id
        })
        let oldImg = tool.getImgurl(olddata.data.content);
        oldImg.push(olddata.data.cover);
        var old = tool.array_intersection(newImg, oldImg);
        var del = tool.array_difference(old, oldImg);
        var add = tool.array_difference(old, newImg);
        if (del.length > 0) await imgModel.useInc({
            path: del
        }, -1);
        if (add.length > 0) await imgModel.useInc({
            path: add
        }, 1);
        return this.model.update({
            _id: data._id
        }, data).then(function(result) {
            return {
                err_code: 200,
                err_msg: '修改成功',
                data: result
            }
        }, function(err) {
            return tool.dataJson(104, '数据库错误');
        });

    }
    async del(data) {

        if (!data['_id']) {
            return tool.dataJson(104, '数据库错误');
        }
        let olddata = await this.findOne({
            _id: data._id
        })
        let oldImg = [];
        oldImg.push(olddata.data.cover);
        await imgModel.useInc({
            path: oldImg
        }, -1);
        return this.model.remove(data).then(function(result) {
            return tool.dataJson(200, '删除成功');
        }, function(err) {
            return tool.dataJson(104, '数据库错误');

        });
    }
}

module.exports = new Teach();
