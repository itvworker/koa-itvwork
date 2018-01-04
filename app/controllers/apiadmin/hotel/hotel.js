class Hotel{
  constructor() {
    return this;
  }
  async init(ctx, next) {
      this.ctx = ctx;
      this.next = next;

  }

  async index(){
    this.ctx.body="hotel-hotel-index";
  }
  async hotel(){
    this.ctx.body="hotel-hotel-hotel";
  }
}
module.exports = new Hotel();
