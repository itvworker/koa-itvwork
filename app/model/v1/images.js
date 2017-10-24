var fs = require("fs");

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
            }

        }, {
            collection: 'images',
            versionKey: false
        });

        this.model = mdb.model('images', this.schema);


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
        let arr = data.split(',');
        let dataBuffer = new Buffer(arr[1], 'base64');
        return new Promise(function (resolve, reject) {
            let id = tool.getid();
            fs.writeFile(webconfig.source + '/images/' + id + '.png', dataBuffer, function (err) {
                if (err) {
                    resolve(err);
                } else {
                    resolve({
                        err_code: 200,
                        err_msg: '保存成功',
                        url: id + '.png'
                    });
                }
            });
        })
    };
}

module.exports = new Images();