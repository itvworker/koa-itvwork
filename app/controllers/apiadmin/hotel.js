class Hotel{
  constructor() {
    return this;
  }
  async init(ctx, next) {
      this.ctx = ctx;
      this.next = next;
      this.next();
  }

}

module.exports = new Hotel();
