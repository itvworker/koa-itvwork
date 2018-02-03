class About{
  constructor() {
    return this;
  }

  async index(){
      await this.ctx.render('about',{});
  }

}

module.exports = new About();
