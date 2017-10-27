const imgModel = require(path.join(webconfig.v1, 'images.js'));

class Images {
    constructor(ctx,next) {

    }
    async list(ctx,next){
        ctx.body=await imgModel.find({});

       // await ctx.render('user',{title:1000});
    }




}

module.exports=new Images();