const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));

class Case {
  constructor() {    
  }
  async index(ctx, next) {
    let param=ctx.params;
    let query=ctx.query;
    let ad = await adModel.find({ query: { classify:'c2579aa247445f4f100853ca063c483d'}});
    let brand = await caseModel.find({query:{sort:param.sort},num:16,page:1 });
    let url = tool.pageurl(ctx.path,query); 
    
    let page=new Page({
      pot:13,
      url:url,
      page:10,
      num:12,
      count:30000
    })
    

    await ctx.render('case',{ad:ad.data.result,brand:brand.data.result,page:page.html()});



  }



}


module.exports = new Case();