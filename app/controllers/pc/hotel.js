class Hotel{
  constructor() {
    return this;
  }
  init(ctx, next) {
      this.ctx = ctx;
      this.next = next;
  }


}
module.exports = new Hotel();
