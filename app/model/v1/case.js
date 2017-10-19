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
            update_time:{
                type:String,
                default:""
            },
            source:{
                type:String,
                default:''
            },
            author:{
               type:String,
               default:''
            },
            cover:{
                type:Object,
                default:''
            },
            views:{
                type:Number,
                default:0
            },
            like:{
                type:Number,
                default:0
            },
            content:{
                type:String,
                default:''
            },
            add_time: String

        }, {
            collection: 'case',
            versionKey: false
        });

        this.model = mdb.model('case', this.schema);
        // this.model.schema.path('username').validate(function (value) {
        //     if (value.length <= 1) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        //
        // }, '用户名不能为空');


    }

    //添加后台管理人员
    async add(data) {


    }
}

module.exports = new Case();