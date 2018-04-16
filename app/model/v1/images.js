var fs = require("fs");
var {
    promisify
} = require('util');
var sizeOf = promisify(require('image-size'));
var gm = require('gm');
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
                type: Number,
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

    //将base64位图片保存成图片文件---单张
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
    //将base64位图片保存成图片文件
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
                        size: size,
                        id: id,
                        type: data.type
                    });
                }
            });
        })
    };
    //图片列表
    async find(arg) {
        arg['query'] = arg['query'] ? arg['query'] : {};
        arg['sort'] = arg['sort'] ? arg['sort'] : {
            add_time: -1
        };
        arg['num'] = arg['num'] ? arg['num'] : 10;
        arg['page'] = arg['page'] ? arg['num'] * (arg['page'] - 1) : 0;

        let count = await this.count(arg['query']);
        return this.model.find(arg.query).sort(arg.sort).skip(parseInt(arg.page)).limit(parseInt(arg.num)).then(function (result) {
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
    //获取条数
    count(query) {
        return this.model.find(query).count(function (result) {
            return result;
        });
    }
    //插入多数据
    inserts(data) {
        return new this.model.insertMany(data).then(function (result) {
            return tool.dataJson(200, '上传成功', result);
        }, function (err) {
            return tool.dataJson(104, '上传失败', err);
        });
    }
    //获取图片信息
    sizeImg(data) {
        return sizeOf(webconfig.source + '/images/' + data)
            .then(dimensions => {
                return dimensions;
            })
            .catch(err => console.error(err));
    }

    //上传多张图片
    async uploads(data, ctx, type) {
        let arr = [];

        let defeatNum = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            let result = await this.saveBase64(data[i]);
      
          //  let resize1 = await this.resizeImg(result.url,400,result.id,result.type);
            if (result.err_code == 200) {
                arr.push({
                    _id: tool.getid(),
                    path: result.url,
                    author: ctx.session.data._id,
                    sort: type,
                    size: result.size,
                    add_time:tool.time()
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
            }else{
                reject(exites)
            }

        })

        // fs.unlink()
    }

    findZero() {
        return this.model.find({
            use: {
                $lte: 0
            }
        }).then(function (result) {
            resolve(result);

        }, function (err) {
            return {
                err_code: 500,
                err_msg: '错误',
                err: err
            }
        })
    }
    resizeImg(url, width, name, type) {
        return new Promise(function (resolve, reject) {
            gm('/public/images/' + url).resize(width).write('/public/images/' + name +'whith_'+ width +'.'+ type, function (err) {
                if (!err) {
                    resolve(true);
                }else{
                    console.log(err);
                    resolve(false);
                }
            });
        })

    }

    async clear() {

    }

}

module.exports = new Images();
