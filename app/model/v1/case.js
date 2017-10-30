class Case {
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
            like: {
                type: Number,
                default: 0
            },
            content: {
                type: String,
                default: ''
            },
            sort:{
              type:String,
              default:0
            },

            add_time: {
                type:String,
                default:tool.time()
            }
        }, {
            collection: 'case',
            versionKey: false
        });

        this.model = mdb.model('case', this.schema);


    }

    //添加品牌案例
    async add(data) {
        data['add_time'] = tool.time();
        data['_id'] = tool.getid();
        data['update_time']= data['add_time'];
        return new this.model(data).save().then(function (result) {
            return {
                err_code: 200,
                err_msg: '添加成功',
                data: result
            }
        }, function (err) {
            return {
                err_code: 103,
                err_msg: '添加失败'
            }
        })

    }
}

module.exports = new Case();