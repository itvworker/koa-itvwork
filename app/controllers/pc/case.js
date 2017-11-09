const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));

class Case {
  constructor() {    
  }
  async index(ctx, next) {
    let param=ctx.params;
    let query=ctx.query;
    let ad = await adModel.find({ query: {classify:'bfdaf1d4b22e5a63ba9b944dd446ad1d'}});

    let search={};
    if(JSON.stringify(param)!=='{}'){
      search['sort']=param.sort;
    }

    let brand = await caseModel.find({query:search,num:16,page:1 });
    let url = tool.pageurl(ctx.path,query); 
    
    let page=new Page({
      pot:13,
      url:url,
      page:query.page?query.page:1,
      num:12,
      count:30000
    })
    

    await ctx.render('case',{ad:ad.data.result,brand:brand.data.result,page:page.html()});



  }



}


module.exports = new Case();