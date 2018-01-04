class Contact{
  constructor() {
    return this;
  }
  init(ctx, next) {
      this.ctx = ctx;
      this.next = next;
  }
  async index(){
      await this.ctx.render('contact',{});
  }

}

module.exports = new Contact();
