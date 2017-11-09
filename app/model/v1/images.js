var fs = require("fs");
var {
    promisify
} = require('util');
var sizeOf = promisify(require('image-size'));
class Images {
    constructor() {
        this.schema = new mdb.Schema({
            _id: {
                type: String,
                index: true,
                default: tool.getid()
            },
            title: {
                type: String,
                default: ''
            },
            path: {
                type: String,
                default: ''
            },
            view: {
                type: Number,
                default: 0
            },
            author: {
                type: String,
                default: ''
            },
            uploader: {
                type: String,
                default: ''
            },
            use: {
                type: Number,
                default: 0
            },
            sort: {
                type: String,
                default: ''
            },
            add_time: {
                type: String,
                default: tool.time()
            },
            width: {
                type: Number,
                default: 0,

            },
            height: {
                type: Number,
                default: 0
            },
            type: {
                type: String,
                default: 'jpg'
            },
            size: {
                type: Number,
                default: 0
            }

        }, {
            collection: 'images',
            versionKey: false
        });

        this.model = mdb.model('images', this.schema);
        this.i = 0;

    }


    async base64(data) {
        let localimg = await this.saveBase64(data.path);
        if (localimg['err_code'] == 200) {
            data.path = localimg.url;
            data['_id'] = tool.getid();

            return new this.model(data).save().then(function (result) {
                return {
                    err_code: 200,
                    err_msg: '保存成功',
                    data: result
                }

            }, function (err) {
                return {
                    err_code: 103,
                    err_msg: '保存失败',
                }
            })
        } else {
            return new Promise(function (resove, reject) {
                resove({
                    err_code: 103,
                    err_msg: '保存失败',
                })
            })
        }

    }

    saveBase64(data) {
        let dataBuffer = new Buffer(data.data, 'base64');
        let size = dataBuffer.length;
        return new Promise(function (resolve, reject) {
            let id = tool.getid();
            fs.writeFile(webconfig.source + '/images/' + id + '.' + data.type, dataBuffer, function (err) {
                if (err) {
                    resolve(err);
                } else {
                    resolve({
                        err_code: 200,
                        err_msg: '保存成功',
                        url: id + '.' + data.type,
                        size: size
                    });
                }
            });
        })
    };

    async find(arg) {
        arg['query'] = arg['query'] ? arg['query'] : {};
        arg['sort'] = arg['sort'] ? arg['sort'] : {
            add_time: -1
        };
        arg['num'] = arg['num'] ? arg['num'] : 10;
        arg['page'] = arg['page'] ? (arg['num'] - 1) * (arg['page'] - 1) : 0;
        let count = await this.count(arg['query']);
        return this.model.find(arg.query).sort(arg.sort).limit(parseInt(arg.num)).skip(parseInt(arg.page)).then(function (result) {
            if (result) {
                return {
                    err_code: 200,
                    err_msg: '查询成功',
                    data: {
                        count: count,
                        result: result
                    }
                }
            } else {
                return {
                    err_code: 0,
                    err_msg: '没有数据',
                }

            }

        }, function (err) {
            return {
                err_code: 500,
                err_msg: '错误',
                err: err
            }
        })
    }

    count(query) {
        return this.model.find(query).count(function (result) {
            return result;
        });
    }

    inserts(data) {
        return new this.model.insertMany(data).then(function (result) {
            return tool.dataJson(200, '上传成功', result);
        }, function (err) {
            return tool.dataJson(104, '上传失败', err);
        });
    }
    sizeImg(data) {
        return sizeOf(webconfig.source + '/images/' + data)
            .then(dimensions => {
                return dimensions;
            })
            .catch(err => console.error(err));
    }
    async uploads(data, ctx, type) {
        let arr = [];
        let defeatNum = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            console.log(i);
            let result = await this.saveBase64(data[i]);
            if (result.err_code == 200) {
                arr.push({
                    _id: tool.getid(),
                    path: result.url,
                    author: ctx.admin.id,
                    sort: type,
                    size: result.size
                })
            } else {
                defeatNum++;
            }
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            let result = await this.sizeImg(arr[i]['path']);
            arr[i]['width'] = result.width;
            arr[i]['height'] = result.height;
            arr[i]['type'] = result.type;
        }


        return this.inserts(arr);
    }

    async useInc(data, num) {
        return this.model.updateMany(data, {
            $inc: {
                use: num
            }
        }).then(function (result) {
            return tool.dataJson(200, '上传成功', result);
        }, function (err) {
            return tool.dataJson(104, '上传成功', err);
        })
    }

    async del(url) {
        return new Promise(function (resolve, reject) {
            let exites = fs.existsSync(webconfig.source + '/' + url);
            if (exites) {
                resolve(fs.unlink(webconfig.source + '/' + url));
            }

        })

        // fs.unlink()
    }

    findZero() {
        return this.model.find({use:{$lte:0}}).then(function (result) {
           resolve(result);

        }, function (err) {
            return {
                err_code: 500,
                err_msg: '错误',
                err: err
            }
        })
    }

    async clear() {

    }

}

module.exports = new Images();