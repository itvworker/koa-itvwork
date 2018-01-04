class About{
  constructor() {
    return this;
  }
  init(ctx, next) {
      this.ctx = ctx;
      this.next = next;
  }
  async index(){
      await this.ctx.render('about',{});
  }

}

module.exports = new About();
