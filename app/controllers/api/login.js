const AdminModel = require(path.join(webconfig.model + '/v1', 'admin.js'));


class Login {
    constructor(ctx, next) {

    }

    async index(ctx, next) {
        let data = ctx.request.body;
        let result = await AdminModel.findone({username: data['username']});
        if (result.err_code == 200) {
            if (tool.md5(data.pwd + 'qazxswedqwertyuiop') === result.data.pwd) {
                let tokenSession = await ctx.session.add({
                    power: result.data.power,
                    _id: result.data._id,
                    username: result.data.username
                });
                ctx.body=tool.dataJson(200,"登录成功",{token:tokenSession._id,power:result.data.power,username:result.data.username});


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