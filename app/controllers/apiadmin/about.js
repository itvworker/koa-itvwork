class About{
  constructor() {
    return this;
  }
  async init(ctx, next) {
      this.ctx = ctx;
      this.next = next;
  }
  async index(){
      await this.ctx.render('about',{});
  }

}

module.exports = new About();
