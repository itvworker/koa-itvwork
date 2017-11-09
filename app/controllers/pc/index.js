const adModel = require(path.join(webconfig.v1, 'ad.js'));
const caseModel = require(path.join(webconfig.v1, 'case.js'));
const fs=require('fs');

class Index {
  constructor() {    
  }
  async index(ctx, next) {

    
    let ad = await adModel.find({ query: {classify:'90d67eabd91381c13f8ff0734f884f0b'}});
    let link= await adModel.find({ query: {classify:'5a6f1b597502522a42d5c674248a77cd'}});
    let url=path.join(webconfig.source, 'images');
    let brand = await caseModel.find({num:8,page:1 });
  

   await ctx.render('index',{ad:ad.data.result,brand:brand.data.result,inpage:true,link:link.data.result});
    
  }



}


module.exports = new Index();