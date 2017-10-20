var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = 'XSghKCNu9i46NZrqepAOv7cknXRGgtfeva6O7WAr';
qiniu.conf.SECRET_KEY = '7qahI3s3aOrEZZTviyi3v95pdcnFKtJ3_DvwWtvn';
var fs = require("fs");

class Images {
    constructor() {
        this.schema = new mdb.Schema({
            _id: {
                type: String,
                index: true
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
            add_time: String

        }, {
            collection: 'images',
            versionKey: false
        });

        this.model = mdb.model('images', this.schema);


    }


    async base64(data) {
        let base64Data = data.path.replace(/^data:image\/\w+;base64,/, "");
        let localimg = await this.saveBase64(base64Data);
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

    saveBase64(base64Data) {
        let dataBuffer = new Buffer(base64Data, 'base64');
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