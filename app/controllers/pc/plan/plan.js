class Plan{
  constructor() {
    return this;
  }
  init(ctx, next) {
      this.ctx = ctx;
      this.next = next;

  }

  async index(){
    this.ctx.body="plan-plan-index";
  }
  async plans(){
    this.ctx.body="plan-plan-plans";
  }
}
module.exports = new Plan();
