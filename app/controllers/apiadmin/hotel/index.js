class Index{
  constructor() {
    return this;
  }
  async init(ctx, next) {
      this.ctx = ctx;
      this.next = next;
  }

  async index(){
      this.ctx.body="hotel-index-index";

  }
  async plan(){
      this.ctx.body="hotel-index-plan";

  }

}
module.exports = new Index();
