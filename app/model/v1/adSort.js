class CaseSort {
    constructor() {
        this.schema = new mdb.Schema({
            _id: {
                type: String,
                default:tool.getid()
            },
            title: {
                type: String,
                default: ""
            },
            update_time:  {
                type: String,
                default: tool.time()
            },
            width:{
                type:String,
                default:''
            },
            height:{
                type:String,
                default:''
            },
            add_time:  {
                type: String,
                default: tool.time()
            },
        }, {
            collection: 'ad_sort',
            versionKey: false
        });

        this.model = mdb.model('ad_sort', this.schema);
    }

    async add(data) {
      
        data['_id']=tool.getid();
        data['update_time']= data['add_time']= tool.time();
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

    async find(){
        return this.model.find({}).sort('+add_time').then(function (result) {
           
            return {err_code:200,err_msg:'查找成功',data:result}
        },function (err) {
            return {err_code:0,err_msg:'数据库错误'};
        });

    }
    async findone(data){
        return this.model.find(data).then(function (result) {
            if(result===null){
                return {err_code:0,err_msg:'没有数据'};
            }
            return {err_code:200,err_msg:'查找成功',data:result}
        },function (err) {
            return {err_code:0,err_msg:'数据库错误'};
        });
    }

    async del(data){
        if(!data['cover']){
            return {err_code:0,err_msg:'数据库错误'};
        }
        if(!data['_id']){
            return {err_code:0,err_msg:'数据库错误'};
        }
        
        return this.model.remove(data).then(function (result) {
            return {err_code:200,err_msg:'删除成功'};
        },function (err) {
            return  {err_code:0,err_msg:'数据库错误'};
        });
    }

    async update(check,doc){
        return this.model.update(check,doc).then(function (result) {
            
             return {err_code:200,err_msg:'修改成功',data:result}
        },function (err) {
             return {err_code:0,err_msg:'数据库错误'}
        });
    }
}

module.exports = new CaseSort();