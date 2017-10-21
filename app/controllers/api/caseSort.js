const caseModel = require(path.join(webconfig.v1,'case.js'));
const imgModel = require(path.join(webconfig.v1,'images.js'));

class CaseSort {
    constructor(ctx,next) {

    }
    async add(ctx,next){

        ctx.body=ctx.request.body;
        // await ctx.render('user',{title:1000});
    }




}

module.exports=new CaseSort();