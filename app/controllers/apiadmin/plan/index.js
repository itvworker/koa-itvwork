class Index{
  constructor() {
    return this;
  }
  init(ctx, next) {
      this.ctx = ctx;
      this.next = next;

  }

  async index(){
    this.ctx.body="plan-index-index";
  }

  async plans(){
    this.ctx.body="plan-index-plans";
  }

}
module.exports = new Index();
