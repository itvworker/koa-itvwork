const imgModel = require(path.join(webconfig.v1, 'images.js'));

class Images {

    async list(){
        let post = this.ctx.request.body;
        this.ctx.body=await imgModel.find(post.data);
       // await this.ctx.render('user',{title:1000});
    }

    async uploads(){
        let post = this.ctx.request.body;
      
        this.ctx.body=await imgModel.uploads(post.data,this.ctx,post.type);
    }

    async del(url){

    }

    async clear(){


    }
}

module.exports=new Images();
