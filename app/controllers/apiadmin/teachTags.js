const TeachTagsModel = require(path.join(webconfig.v1, 'teachTags.js'));
class TeachTags {
    async addOrUpdate() {
      let post = this.ctx.request.body;
      let data={
        err_code:'201',
        err_msg:'没有提交数据'
      };

      console.log();
      if(post['data']&&post['data']['_id']){
          data=await TeachTagsModel.update({_id:post['data']["_id"]},{title:post['data']['title']});
      }
      if(post['data']&&!post['data']['_id']){
          data=await TeachTagsModel.add(post['data']);
      }

      this.ctx.body = data;
    }
    async del(){
      let post = this.ctx.request.body;
      let res = await TeachTagsModel.del(post['data']);
      this.ctx.body=res;

    }
    async index(){
      let post = this.ctx.request.body;
      let result= await TeachTagsModel.find(post['data']);
      this.ctx.body = tool.aesData(result, post.key);
    }



}

module.exports = new TeachTags();
