class CaseSort {
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
            update_time:  {
                type: String,
                default: tool.time()
            },
            cover: {
                type: Object,
                default: ''
            },
            add_time:  {
                type: String,
                default: tool.time()
            },
        }, {
            collection: 'case_sort',
            versionKey: false
        });

        this.model = mdb.model('case_sort', this.schema);


    }

    async add(data) {
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

module.exports = new CaseSort();