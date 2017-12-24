const AdminModel = require(path.join(webconfig.v1, 'admin.js'));


class Login {
  init(ctx,next){
    this.ctx=ctx;
    this.next=next;
  }

    async index(ctx, next) {

        let data = ctx.request.body;
        let result = await AdminModel.findone({username: data['username']});
        if (result.err_code == 200) {


            if (tool.md5(data.pwd + 'qazxswedqwertyuiop') === result.data.pwd) {
                let tokenSession = await ctx.session.add({
                    _id:tool.getid(),
                    data:{
                        power: result.data.power ? result.data.power : '',
                        username: result.data.username,
                        id:result.data._id
                    }
                });

                if (tokenSession.err_code == 200) {
                    ctx.body = tool.dataJson(200, "登录成功", {
                        token: tokenSession.data._id,
                        power: tokenSession.data.power,
                        username: result.data.username
                    });
                } else {
                    ctx.body = tool.dataJson(103, "登录失败", '');
                }

            } else {
                ctx.body = {
                    err_code: 0,
                    err_msg: '密码错误'
                }
            }
        } else {
            ctx.body = {
                err_code: 0,
                err_msg: '用户或密码错误'
            }
        }
    }


}

module.exports = new Login();
