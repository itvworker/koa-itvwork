const userModel = require(path.join(webconfig.v1, 'user.js'));
const Verify = require(path.join(webconfig.common, 'verify.js'));
const moneyModel = require(path.join(webconfig.v1, 'money.js'));

class Reg {
    async index() {
        let post = this.ctx.request.body;
        let as = new Verify({
          username:{
              schema:'phone',
              schemaReqiure:'电话号码是必填的',
              schemaUniq:['电话号码已经存',userModel],
              schemaMsg:'电话号码格式错误'
          },
          pwd:{
            schema:'pwd',
            schemaReqiure:'密码必须填的',
            schemaMsg:'密码必须包括大写字母小写字母以及数字并长度大于等于6的字符'
          }
        });

        let very = await as.init(post);
        if(very!==true){
          this.ctx.body=tool.dataJson(103, '错误',  very);
          return false;
        }

        let data={
          username:post.username,
          pwd: tool.md5(post.pwd + 'qazxswedqwertyuiop')
        };
        let res=await userModel.reg(data);

        if(res.err_code==200){
            this.ctx.body=tool.dataJson(200, '注册成功');
        }else{
            this.ctx.body=res;
        }

    }

    async admin(){
        let post = this.ctx.request.body;
        let as = new Verify({
          username:{
              schemaReqiure:'帐号是必填的',
              schemaUniq:['帐号已经存在',userModel],
          },
          pwd:{
            schema:'pwd',
            schemaReqiure:'密码必须填的',
            schemaMsg:'密码必须包括大写字母小写字母以及数字并长度大于等于6的字符'
          }
        });
        let very = await as.init(post);
        if(very!==true){
            this.ctx.body=tool.dataJson(104, very);
            return false;
        }
        let data={
          username:post.username,
          pwd: tool.md5(post.pwd + 'qazxswedqwertyuiop'),
          role:0
        };
        let res=await userModel.reg(data);
        this.ctx.body=res;
    }

    async login() {
        let post = this.ctx.request.body;
        let as = new Verify({
          username:{
              schemaReqiure:'帐号是必填的',
          },
          pwd:{
            schema:'pwd',
            schemaReqiure:'密码必须填的',
            schemaMsg:'密码必须包括大写字母小写字母以及数字并长度大于等于6的字符'
          }
        });
        let very = await as.init(post);
        if(very!==true){
            this.ctx.body=tool.dataJson(104, very);
            return false;
        }

        let res= await userModel.findOne({
          username:post.username,
          pwd:tool.md5(post.pwd + 'qazxswedqwertyuiop')
        })
        if(res.err_code==200){
          let tokenSession = await this.ctx.session.add({
              _id:tool.getid(),
              data:res.data
          });

          if (tokenSession.err_code == 200) {
            let dt=tokenSession.data.data;
              this.ctx.body=tokenSession;
              this.ctx.body = tool.dataJson(200, "登录成功", {
                  token: tokenSession.data._id,
                  role: dt.role,
                  power: dt.power,
                  type:dt.type,
                  username:dt.username
              });

          } else {
              this.ctx.body = tool.dataJson(103, "登录失败", '');
          }
        }else{
            this.ctx.body=tool.dataJson(104, '帐号或密码错误');;
        }





    }
}




module.exports = new Reg();
