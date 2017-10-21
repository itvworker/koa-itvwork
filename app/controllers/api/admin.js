const AdminModel = require(path.join(webconfig.v1,'admin.js'));

class Admin {
    constructor(ctx,next) {

    }
    async add(ctx,next){
        let data=ctx.request.body;
        data['_id']=tool.getid();
        data['add_time']=tool.time();
        data['pwd']=tool.md5(data.pwd+'qazxswedqwertyuiop');
        let content= await AdminModel.add(data);
        if(content.err_code==200){
            ctx.body=content;
        }else{
            ctx.body=content;
        }

       // await ctx.render('user',{title:1000});
    }
    async list(ctx,next) {

            ctx.body=ctx.request.body;
        // let content = await AdminModel.find();
        // ctx.body = content;

    }



}

module.exports=new Admin();