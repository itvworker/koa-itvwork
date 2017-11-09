const teachModel = require(path.join(webconfig.v1, 'teach.js'));


class Teach {
  constructor() {    
  }
  async index(ctx, next) {
    
    

    await ctx.render('school');



  }



}


module.exports = new Teach();