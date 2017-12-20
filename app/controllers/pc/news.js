
const newsModel = require(path.join(webconfig.v1, 'news.js'));
const fs = require('fs');

class News {

    async init(ctx){
      return true;

      }
  async index(ctx, next) {
     let param=ctx.params;
     let query=ctx.query;
     let search={};
     if(JSON.stringify(param)!=='{}'){
       search['sort']=param.sort;
     }

     let list = await newsModel.find({query:search,num:16,page:1 });
     let url = tool.pageurl(ctx.path,query);

     let page=new Page({
       pot:13,
       url:url,
       page:query.page?query.page:1,
       num:12,
       count:30000
     })

     await ctx.render('news',{data:list.data.result,page:page.html()});



  }

  async reg(ctx, next) {



  }



}


module.exports = new News();
