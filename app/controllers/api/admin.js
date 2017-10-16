const AdminModel = require(path.join(webconfig.model,'admin.js'));

class Admin {
    constructor(ctx,next) {

    }
    async index(ctx,next){
        let data=ctx.query;
        data['_id']=tool.getid();
        data['add_time']=tool.time();
        data['pwd']=tool.md5(ctx.query.pwd+'qazxswedqwertyuiop');
        AdminModel.add(ctx.query);
        await ctx.render('user',{title:1000});
    }
    async list(ctx,next){

    }
    async set(ctx,next){

    }
}

module.exports=new Admin();