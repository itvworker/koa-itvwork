const teachModel = require(path.join(webconfig.v1, 'teach.js'));


class Teach {
    constructor() {
        return this;
    }
    async init(ctx, next) {
        this.ctx = ctx;
        this.next = next;
    }
    async index() {
        await this.ctx.render('school');
    }
    


}


module.exports = new Teach();
