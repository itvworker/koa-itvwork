class Hotel{
  constructor() {
    return this;
  }
  async init(ctx, next) {
      this.ctx = ctx;
      this.next = next;
  }

}

module.exports = new Hotel();
