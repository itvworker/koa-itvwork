const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));

class Index {
  constructor() {    
  }
  async index(ctx, next) {

    
    let ad = await adModel.find({ query: {classify:'25562c222aaf3ee42fbef315219cb3ad'}});
    let brand = await caseModel.find({num:8,page:1 });

    await ctx.render('index',{ad:ad.data.result,brand:brand.data.result});
    
  }



}


module.exports = new Index();