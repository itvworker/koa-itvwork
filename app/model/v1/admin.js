class Admin {
    constructor() {
         this.schema = new mdb.Schema({
             _id:{
                 type:String,
                 index:true
             },
             username:{
                 type: String,
                 unique: false,
                 index:true,
                 default:""
             },
             power:{
                 type:Object,
                 default:"",
             },
             pwd:{
               type:String
             },
             add_time: {
               type:Number,
               default:0
             }

        },{
             collection:'admin',
             versionKey:false
         });
        this.model = mdb.model('admin', this.schema);
        this.model.schema.path('username').validate(function (value) {
            if(value.length<=1){
                return false;
            }else{
                return true;
            }

        },'用户名不能为空');
    }

    //添加后台管理人员
    async add(data){
        let valt=await this.model.findOne({
            username:data['username']
        }).then(function (result) {
            if(result===null){
                return false;
            }
            return true;
        },function (err) {
            return false;
        });

        if(valt){
            return {
                err_code:0,
                err_msg:'用户名已存在'
            }
        }
         return new this.model(data).save().then(function (result) {
             let json={
                 err_code:200,
                 err_msg:'添加成功',
                 data:result
             }
             return json;
         },function (err) {
             let json={
                 err_code:0,
                 err_msg:'添加失败',
                 errors:err['errors']
             }
             return json;
         })
    }
    async find(){
        let count=await this.model.find().count(function (result){
            return result;
        });
        return this.model.find().sort('-add_time').limit(10).skip(0).then(function (result) {
            if(result){
                return {
                    err_code:200,
                    err_msg:'查询成功',
                    data:result
                }
            }else{
                return {
                    err_code:0,
                    err_msg:'没有数据',
                }
            }
        },function (err) {
            return {
                err_code:500,
                err_msg:'错误',
                err:err
            }
        })
    }
    async findone(data){
        return this.model.findOne(data).then(function (result) {
            if(result===null){
                return {err_code:0,err_msg:'用户名不存在'}
            }
              return {err_code:200,err_msg:'用户存在',data:result}
        },function (err) {
            return {err_code:0,err_msg:'数据库错误'}
        });
    }
}

module.exports=new Admin();
