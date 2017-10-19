
var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = 'XSghKCNu9i46NZrqepAOv7cknXRGgtfeva6O7WAr';
qiniu.conf.SECRET_KEY = '7qahI3s3aOrEZZTviyi3v95pdcnFKtJ3_DvwWtvn';

class Images {
    constructor() {
        this.schema = new mdb.Schema({
            _id:{
                type:String,
                index:true
            },
            title:{
                type: String,
                default:''
            },
            path:{
                localpath:{
                    type:String,
                    default:''
                },
                url:{
                    type:String,
                    default:''
                }
            },
            view:{
                type:Number,
                default:0
            },
            use:{
                type:Number,
                default:0
            },
            add_time:String

        },{
            collection:'images',
            versionKey:false
        });

        this.model = mdb.model('images', this.schema);

        // this.model.schema.path('username').validate(function (value) {
        //     console.log(value);
        //       return false;
        // },'请输入正确的用户名');

    }

    //添加后台管理人员
    async base64(data){
        var putPolicy = new qiniu.rs.PutPolicy(bucket);

    }

}

module.exports=new Images();